import UserModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { validationResult } from 'express-validator'
dotenv.config();

let refreshTokens = [];

export const register = async (req, res) => {
    try {
        const { firstName, lastName, age, email, password, role } = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }

        const oldUser = await UserModel.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User with that email already exists. Please login.");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            firstName,
            lastName,
            age,
            email,
            password: encryptedPassword,
            role,
        });

        const token = jwt.sign(
            { user_id: user._id, email, role },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        user.token = token;

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All fields are required!");
        }

        const user = await UserModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(409).send("Incorrect login credentials");
        }

        const role = user.role;

        if (user && (await bcrypt.compare(password, user.password))) {
            
            const token = jwt.sign(
                { user_id: user._id, email, role },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "10m",
                }
            );
            const refreshToken = jwt.sign(
                { user_id: user._id, email, role },
                process.env.REFRESH_KEY,
                {
                    expiresIn: "10m",
                }
            );
            refreshTokens.push(refreshToken);

            user.token = token;

            return res.json({
                token,
                refreshToken
            });
        }
        res.status(400).send("Invalid credentials.");
    } catch (error) {
        console.log(error);
    }
}

export const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send(error);
    }
}






export const newToken = (req, res) => {
    const refreshToken = req.headers["x-access-token"];

    if (!refreshToken) {
        return res.status(401).json("Token not found");
    }

    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Invalid refresh token");
    }

    const user = jwt.verify(
        refreshToken,
        process.env.REFRESH_KEY
    );

    const { email, role } = user;

    jwt.verify(refreshToken, process.env.REFRESH_KEY, (error, user) => {
        if (error) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign(
            { user_id: user._id, email, role },
            process.env.TOKEN_KEY,
            {
                expiresIn: "30s",
            }
        );

        const refreshToken = jwt.sign(
            { user_id: user._id, email, role },
            process.env.REFRESH_KEY,
            {
                expiresIn: "30s",
            }
        );

        res.json({
            accessToken,
            refreshToken
        });
    });
}

export const logout = (req, res) => {
    const refreshToken = req.header("x-access-token");

    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    res.status(204).json();
}