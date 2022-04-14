// verifies the token to check if the request have the required privileges
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyAuthToken = (req: Request, res: Response, next:NextFunction) => {
    try {
        const authorizationHeader:string = req.headers.authorization as string;
        const token:string = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

        next();
    } catch (err) {
        res.status(401).json(`Invalid token, Error: ${err}`).end();
    }
}

export default verifyAuthToken;