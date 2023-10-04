const jwt = require('jsonwebtoken');
import { UnauthenticatedError }  from '../errors';
import { NextFunction, Request, Response } from 'express';
import { isTokenValid } from './../utils/jwt';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided')
    }
    
    const token = authHeader.split(' ')[1]

    try {
        isTokenValid(token);
        next();
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access.')
    }
}