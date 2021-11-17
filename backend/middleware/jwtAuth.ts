import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { failResponse } from '../scripts/response';
dotenv.config();

const JWT_HASH = process.env.JWT_HASH || '';

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['access-token'] as string;
    if (token) {
        return jwt.verify(token, JWT_HASH, (err, _) => {      
            if (err) {
                return res.status(401).json(failResponse("Invalid Token", false));
            } else {
                return next();
            }
        });
    }
    return res.status(401).json(failResponse("No Token", false));
}
