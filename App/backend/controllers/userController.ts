import { Request, Response } from 'express';
import { UserModel as User } from '../models/User';
import { StatusCodes } from 'http-status-codes';
import { decodeToken } from '../utils/jwt';
import * as error from '../errors'

export const userProfile = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;
    const username = decodedToken.username;

    console.log(userId);
    
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new error.NotFoundError('User not found associated with token');
    }

    res.status(StatusCodes.OK).json({
        username,
        email: user.email,
        profilePic: user.profilePic
    });
}