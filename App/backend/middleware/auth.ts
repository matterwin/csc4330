const jwt = require('jsonwebtoken');
import { UnauthenticatedError }  from '../errors';
import { Request, Response } from 'express';

export const authenticate = async (req: Request, res: Response, next: any) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided')
    }
    
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // const { id, username } = decoded
        // req.user = { id, username }
        next();
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access.')
    }
}