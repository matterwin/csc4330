import { Request, Response } from 'express';
import { UserModel as User } from '../models/User';
import { StatusCodes } from 'http-status-codes';
import { decodeToken } from '../utils/jwt';
import * as error from '../errors'

type AllowedFields = 'realname' | 'bio' | 'location';

export const userProfile = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;

    const user = await User.findOne({ _id: userId })

    if (!user) {
      throw new error.NotFoundError('User not found associated with token');
    }

    res.status(StatusCodes.OK).json({
        user
    });
}

export const updatePublicProfile = async (req: Request, res: Response) => {
    const updates = req.body;
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    if (!updates || Object.keys(updates).length === 0) {
        throw new error.BadRequestError('Request body cannot be empty');
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;
    const username = decodedToken.username;

    const allowedUpdates: Partial<Record<AllowedFields, any>> = {};
    Object.keys(updates).forEach((key) => {
        if ((key as AllowedFields) in User.schema.obj) {
            allowedUpdates[key as AllowedFields] = updates[key];
        }
    });
    
    const user = await User.findOneAndUpdate(
        { _id: userId },
        { $set: updates },
        { new: true }
    );

    if (!user) {
        throw new error.NotFoundError('User not found associated with token');
    }

    await user.save();

    res.status(StatusCodes.OK).json({
        msg: `Successfully updated user ${username} profile information.`,
    });
}