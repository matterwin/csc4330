import { Request, Response } from 'express';
import { UserModel as User } from '../models/User';
import { StatusCodes } from 'http-status-codes';
import { decodeToken } from '../utils/jwt';
import * as error from '../errors'

export const showAllUsers = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
        throw new error.NotFoundError('User not found associated with token');
    }

    const populatedUsers = await User
    .find({ _id: { $ne: userId } })
    .select('username realname profilePic');

    const formattedUsers = populatedUsers.map((otherUser) => {
        let maybeFriends = false;
        let maybeSent = false;
        let maybeReceived = false;

        if (user.friends?.includes(otherUser._id)) maybeFriends = true;
        else if (user.sentFriendRequests?.includes(otherUser._id)) maybeSent = true;
        else if (user.receivedFriendRequests?.includes(otherUser._id)) maybeReceived = true;

        return {
            ...otherUser.toObject(),
            isFriend: maybeFriends,
            sentRequestTo: maybeSent,
            receivedRequestFrom: maybeReceived,
        };
    });

    const reversedFormattedUsers = formattedUsers.reverse();

    res.status(StatusCodes.OK).json({
        user: user.username,
        formattedUsers: reversedFormattedUsers
    });
};

export const deleteAllUsers = async (req: Request, res: Response) => {
    await User.deleteMany();

    res.status(StatusCodes.OK).json({
        msg: "All Users are deleted"
    });
}

export const showAllUsersWithFilter = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
        throw new error.NotFoundError('User not found associated with token');
    }

    const { person } = req.params;

    let populatedUsers;
    if(person === '') {
        populatedUsers = await User
        .find({ _id: { $ne: userId } })
        .select('username realname profilePic');
    }
    else {
        populatedUsers = await User
        .find({ 
            _id: { $ne: userId },
            username: { $regex: new RegExp(person, 'i') }
        })
        .select('username realname profilePic');
    }

    const formattedUsers = populatedUsers.map((otherUser) => {
        let maybeFriends = false;
        let maybeSent = false;
        let maybeReceived = false;

        if (user.friends?.includes(otherUser._id)) maybeFriends = true;
        else if (user.sentFriendRequests?.includes(otherUser._id)) maybeSent = true;
        else if (user.receivedFriendRequests?.includes(otherUser._id)) maybeReceived = true;

        return {
            ...otherUser.toObject(),
            isFriend: maybeFriends,
            sentRequestTo: maybeSent,
            receivedRequestFrom: maybeReceived,
        };
    });

    const reversedFormattedUsers = formattedUsers.reverse();

    res.status(StatusCodes.OK).json({
        user: user.username,
        formattedUsers: reversedFormattedUsers
    });
};

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

    const populatedFriends = await User.populate(user, {
        path: 'friends',
        select: '-_id username realname profilePic',
    });

    const friendsList = populatedFriends.friends;

    res.status(StatusCodes.OK).json({
        user: user.username,
        friendsList,
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

    const populatedRequests = await User.populate(user, {
        path: 'sentFriendRequests',
        select: '-_id username realname profilePic',
    })

    const sentRequests = populatedRequests.sentFriendRequests;

    res.status(StatusCodes.OK).json({
        user: user.username,
        sentRequests,
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

    const populatedRequests = await User.populate(user, {
        path: 'receivedFriendRequests',
        select: '-_id username realname profilePic',
    });

    const receivedRequests = populatedRequests.receivedFriendRequests;

    res.status(StatusCodes.OK).json({
        user: user.username,
        receivedRequests,
    });
};

export const sendFriendRequest = async (req: Request, res: Response) => {
    const { sendFriendRequestTo } = req.body;
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

    if(!sendFriendRequestTo) {
        throw new error.BadRequestError(`Please provide a user to send the request to.`);
    }

    const potentialFriend = await User.findOne({ username: sendFriendRequestTo });
    if (!potentialFriend) {
        throw new error.NotFoundError(`User ${sendFriendRequestTo} not found.`);
    }

    // check if you sent yourself a friend request
    if(user.username === potentialFriend.username){
        throw new error.BadRequestError(`Unfortunately you cannot send a friend request to yourself`);
    }
    
    // check if already sent friend request
    const alreadySent = potentialFriend.receivedFriendRequests?.includes(user._id);

    // check if already friend with person
    const alreadyFriends = user.friends?.includes(potentialFriend._id);

    if (alreadySent || alreadyFriends) {
        res.status(StatusCodes.BAD_REQUEST).json({
            msg: "Friend request already sent or users are already friends.",
        });
        return;
    }

    if(user.sentFriendRequests){
        user.sentFriendRequests.push(potentialFriend._id);
        await user.save();
    }

    if(potentialFriend.receivedFriendRequests){
        potentialFriend.receivedFriendRequests.push(user._id);
        await potentialFriend.save();
    }

    res.status(StatusCodes.OK).json({
        user: user.username,
        msg: `Friend request sent successfully to ${potentialFriend.username}`
    });
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
    const { acceptFriendRequestFrom } = req.body;
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

    if(!acceptFriendRequestFrom) {
        throw new error.BadRequestError(`Please provide a user to accept the request from.`);
    }

    const potentialFriend = await User.findOne({ username: acceptFriendRequestFrom });
    if (!potentialFriend) {
        throw new error.NotFoundError(`User ${acceptFriendRequestFrom} not found.`);
    }

    // Ensure the potentialFriend is on the user's receivedFriendRequests list
    if (!user.receivedFriendRequests || !user.receivedFriendRequests.some((request) => request.equals(potentialFriend._id))) {
        throw new error.NotFoundError(`Friend request from ${potentialFriend.username} not found in user's received requests.`);
    }

    // Add user and potentialFriend to each other's friends list
    if (user.friends && potentialFriend.friends) {
        user.friends.push(potentialFriend._id);
        potentialFriend.friends.push(user._id);
        await user.save();
        await potentialFriend.save();
    }

    // Remove user and potentialFriend from each other's receivedFriendRequests and sentFriendRequests
    if (user.receivedFriendRequests && potentialFriend.sentFriendRequests) {
        user.receivedFriendRequests = user.receivedFriendRequests.filter((request) => !request.equals(potentialFriend._id));
        potentialFriend.sentFriendRequests = potentialFriend.sentFriendRequests.filter((request) => !request.equals(user._id));
        await user.save();
        await potentialFriend.save();
    }

    res.status(StatusCodes.OK).json({
        user: user.username,
        msg: `Accepted ${potentialFriend.username}'s Friend request`
    });
};

export const denyFriendRequest = async (req: Request, res: Response) => {
    const { denyFriendRequestFrom } = req.body;
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

    if(!denyFriendRequestFrom) {
        throw new error.BadRequestError(`Please provide a user to accept the request from.`);
    }

    const potentialFriend = await User.findOne({ username: denyFriendRequestFrom });
    if (!potentialFriend) {
        throw new error.NotFoundError(`User ${denyFriendRequestFrom} not found.`);
    }

    // Ensure the potentialFriend is on the user's receivedFriendRequests list
    if (!user.receivedFriendRequests || !user.receivedFriendRequests.some((request) => request.equals(potentialFriend._id))) {
        throw new error.NotFoundError(`Friend request from ${potentialFriend.username} not found in user's received requests.`);
    }

    // Remove user and potentialFriend from each other's receivedFriendRequests and sentFriendRequests
    if (user.receivedFriendRequests && potentialFriend.sentFriendRequests) {
        user.receivedFriendRequests = user.receivedFriendRequests.filter((request) => !request.equals(potentialFriend._id));
        potentialFriend.sentFriendRequests = potentialFriend.sentFriendRequests.filter((request) => !request.equals(user._id));
        await user.save();
        await potentialFriend.save();
    }

    res.status(StatusCodes.OK).json({
        user: user.username,
        msg: `Denied ${potentialFriend.username}'s Friend request`
    });
};

export const canelFriendRequest = async (req: Request, res: Response) => {
    const { cancelFriendRequestTo } = req.body;
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

    if(!cancelFriendRequestTo) {
        throw new error.BadRequestError(`Please provide a user to accept the request from.`);
    }

    const potentialFriend = await User.findOne({ username: cancelFriendRequestTo });
    if (!potentialFriend) {
        throw new error.NotFoundError(`User ${cancelFriendRequestTo} not found.`);
    }

    // Ensure the potentialFriend is on the user's receivedFriendRequests list
    if (!user.sentFriendRequests || !user.sentFriendRequests.some((request) => request.equals(potentialFriend._id))) {
        throw new error.NotFoundError(`Friend request from ${potentialFriend.username} not found in user's sent requests.`);
    }

    // Remove user and potentialFriend from each other's receivedFriendRequests and sentFriendRequests
    if (user.sentFriendRequests && potentialFriend.receivedFriendRequests) {
        user.sentFriendRequests = user.sentFriendRequests.filter((request) => !request.equals(potentialFriend._id));
        potentialFriend.receivedFriendRequests = potentialFriend.receivedFriendRequests.filter((request) => !request.equals(user._id));
        await user.save();
        await potentialFriend.save();
    }

    res.status(StatusCodes.OK).json({
        user: user.username,
        msg: `Cancelled Friend request to ${potentialFriend.username}`
    });
};

export const removeFriend = async (req: Request, res: Response) => {
    const { removeFriend } = req.body;
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

    if(!removeFriend) {
        throw new error.BadRequestError(`Please provide a user to accept the request from.`);
    }

    const actualFriend = await User.findOne({ username: removeFriend });
    if (!actualFriend) {
        throw new error.NotFoundError(`User ${removeFriend} not found.`);
    }

    // check if you're removing yourself as a friend
    if(user.username === actualFriend.username){
        throw new error.BadRequestError(`You can not remove yourself as a friend to yourself`);
    }

    // Ensure the actualFriend is on the user's friends list
    if (!user.friends || !user.friends.some((request) => request.equals(actualFriend._id))) {
        throw new error.NotFoundError(`${actualFriend.username}, not found in user's friends list.`);
    }

    // Remove user and actualFriend from each other's friends list
    if (user.friends && actualFriend.friends) {
        user.friends = user.friends.filter((request) => !request.equals(actualFriend._id));
        actualFriend.friends = actualFriend.friends.filter((request) => !request.equals(user._id));
        await user.save();
        await actualFriend.save();
    }

    res.status(StatusCodes.OK).json({
        user: user.username,
        msg: `Parted ways with ${actualFriend.username}`
    });
};