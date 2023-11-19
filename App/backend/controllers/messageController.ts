import { Request, Response } from 'express';
import { UserModel as User } from '../models/User';
import { DirectMessageModel as DM } from '../models/DirectMessage';
import { MessageModel as Msg } from '../models/Message';
import { StatusCodes } from 'http-status-codes';
import { decodeToken } from '../utils/jwt';
import * as error from '../errors'

export const seeListOFDirectMessagesChats = async (req: Request, res: Response) => {
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

    await User.populate(user, {
        path: 'directmessages',
        populate: [
            {
                path: 'userOne',
                select: '-_id username firstname lastname profilePic',
            },
            {
                path: 'userTwo',
                select: '-_id username firstname lastname profilePic',
            },
        ],
        select: '-_id userOne userTwo messages',
    });

    res.status(StatusCodes.OK).json({
        user: user.username,
        dms: user.directmessages
    });
};

export const createDM = async (req: Request, res: Response) => {
    const { createDMChatWith } = req.body;
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;
    const username = decodedToken.username;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new error.NotFoundError('User not found associated with token');
    }

    const potentialFriend = await User.findOne({ username: createDMChatWith });
    if (!potentialFriend) {
        throw new error.NotFoundError(`User ${createDMChatWith} not found.`);
    }

    // check if you guys are friends
    const alreadyFriends = user.friends?.includes(potentialFriend._id);

    if (!alreadyFriends) {
        res.status(StatusCodes.BAD_REQUEST).json({
            msg: "Sorry, you can only DM a friend.",
        });
        return;
    }

    // Find the direct message between the two users
    const alreadyDM = await DM.findOne({
        $or: [
            { userOne: user._id, userTwo: potentialFriend._id },
            { userOne: potentialFriend._id, userTwo: user._id },
        ],
    });

    if(alreadyDM){
        res.status(StatusCodes.OK).json({
            user: user.username,
            msg: "DM has already been created",
            dmID: alreadyDM._id
        });
        return;
    }

    const dm = await DM.create({ 
        userOne: user._id, 
        userTwo: potentialFriend._id
    });

    // Add dm to the list of dms for each user
    if(user.directmessages && potentialFriend.directmessages){
        user.directmessages.push(dm._id);
        potentialFriend.directmessages.push(dm._id);
        await user.save();
        await potentialFriend.save();
    }

    res.status(StatusCodes.CREATED).json({
        user: user.username,
        dm
    });
}

export const sendDM = async (req: Request, res: Response) => {
    const { sendDMTo, message } = req.body;
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

    if(!sendDMTo){
        throw new error.BadRequestError(`Please provide a user to send a DM to.`);
    }

    if(!message){
        throw new error.BadRequestError(`Please provide a message`);
    }

    const potentialFriend = await User.findOne({ username: sendDMTo });
    if (!potentialFriend) {
        throw new error.NotFoundError(`User ${sendDMTo} not found.`);
    }

    // check if you guys are friends
    const alreadyFriends = user.friends?.includes(potentialFriend._id);

    if (!alreadyFriends) {
        res.status(StatusCodes.BAD_REQUEST).json({
            msg: "Sorry, you can only DM a friend.",
        });
        return;
    }

    // Find the direct message between the two users
    const directMessage = await DM.findOne({
        $or: [
            { userOne: user._id, userTwo: potentialFriend._id },
            { userOne: potentialFriend._id, userTwo: user._id },
        ],
    });

    const msg = await Msg.create({ 
        user: user._id, 
        message: message
    });

    // Add the new message to the direct message's messages array
    directMessage?.messages?.push(msg._id);
    await directMessage?.save();

    // Find and update both users' directmessages arrays
    const userDirectMessage = await User.findOneAndUpdate(
        { _id: user._id, 'directmessages._id': directMessage?._id },
        { $addToSet: { directmessages: directMessage?._id } },
        { new: true }
    );

    const friendDirectMessage = await User.findOneAndUpdate(
        { _id: potentialFriend._id, 'directmessages._id': directMessage?._id },
        { $addToSet: { directmessages: directMessage?._id } },
        { new: true }
    );

    res.status(StatusCodes.OK).json({
        user: user.username,
        msg
    });
}