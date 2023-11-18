import { Request, Response } from 'express';
import { UserModel as User } from '../models/User';
import { FriendModel as Friend } from '../models/Friend';
import { SentFriendRequestModel as SentFriend } from '../models/SentFriendRequest';
import { ReceivedFriendRequestModel as ReceivedFriend } from '../models/ReceivedFriendRequest';
import { StatusCodes } from 'http-status-codes';
import { decodeToken } from '../utils/jwt';
import * as error from '../errors'

export const showFriendsList = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;

    console.log(userId);
    
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new error.NotFoundError('User not found associated with token');
    }

    res.status(StatusCodes.OK).json({
        user: user.username,
        friends: user.friends
    });
}

export const showSentFriendRequestList = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;

    console.log(userId);
    
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new error.NotFoundError('User not found associated with token');
    }

    res.status(StatusCodes.OK).json({
        user: user.username,
        sentFriendsRequests: user.sentFriendRequests
    });
};

export const showReceivedFriendRequestList = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;

    console.log(userId);
    
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new error.NotFoundError('User not found associated with token');
    }

    res.status(StatusCodes.OK).json({
        user: user.username,
        receivedFriendsRequests: user.receivedFriendRequests
    });
};

export const sendFriendRequest = async (req: Request, res: Response) => {
    const { potentialFriend } = req.body;
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;

    console.log(userId);
    
    const user = await User.findOne({ _id: userId });
    if (!user) {
        throw new error.NotFoundError('User not found associated with token');
    }

    if(!potentialFriend) {
        throw new error.BadRequestError(`Please provide a user to send the request to.`);
    }

    const possibleFriend = await User.findOne({ _id: userId });
    if (!possibleFriend) {
        throw new error.NotFoundError('User not found with that username.');
    }

    res.status(StatusCodes.OK).json({
        msg: "bs"
    });
};