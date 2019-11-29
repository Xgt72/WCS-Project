import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        res.locals.verified = verified;
        next();
    }
    catch (err) {
        res.status(400).send("Invalid Token");
    }
};