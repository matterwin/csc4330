import { Request, Response } from 'express';
import { UserModel as User } from '../models/User';
import { EventModel as Event } from '../models/Event';
import { StatusCodes } from 'http-status-codes';
import { decodeToken } from '../utils/jwt';
import * as error from '../errors';
import mongoose from 'mongoose';
const moment = require('moment-timezone');

export const createEvent = async (req: Request, res: Response) => {
    const { 
        privacyType, // required
        titleOfEvent, //required
        place, //required
        eventImage,
        exactLocation,
        dateAndTimeOfEvent,
        description,
        invitedUsers
    } = req.body;

    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new error.NotFoundError('User not found associated with token');
    }

    if(!privacyType || privacyType != 'Friends Only' && privacyType != 'Anyone' && privacyType != 'Private'){
        throw new error.BadRequestError(`Please provide the correct of privacyType: Friends Only or Anyone`);
    }

    if(!titleOfEvent || titleOfEvent.length < 1){
        throw new error.BadRequestError(`Please provide the title of the event`);
    }

    const invitedUsersIds: mongoose.Types.ObjectId[] = [];

    if(invitedUsers){
      for (const username of invitedUsers) {
          const foundUser = await User.findOne({ username: username });

          if (foundUser) {
              invitedUsersIds.push(foundUser._id);
          } else {
              console.log(`User with username ${username} not found.`);
          }
      }
    }

    const newEvent = new Event({
        owner: userId,
        privacyType: privacyType,
        titleOfEvent: titleOfEvent,
        place: place,
        eventImage: eventImage,
        exactLocation: exactLocation,
        dateAndTimeOfEvent: dateAndTimeOfEvent,
        description: description,
        invitedUsers: (invitedUsers) ? invitedUsersIds : null,
    });

    await newEvent.save();

    res.status(StatusCodes.CREATED).json({ 
        msg: 'Event created successfully', 
        event: newEvent 
    });
};

export const deleteEvent = async (req: Request, res: Response) => {
    const { eventId } = req.params;

    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new error.NotFoundError('User not found associated with token');
    }

    if (!eventId || !mongoose.Types.ObjectId.isValid(eventId)) {
        throw new error.BadRequestError(`Please provide a valid event id in params`);
    }

    const event = await Event.findOne({
        _id: eventId
    });

    if(!event){
        throw new error.BadRequestError(`Couldn't find the event you were looking for.`);
    }

    if (!event.owner?.equals(userId)){
        throw new error.BadRequestError(`You are not authorized to delete this event.`);
    }

    if (user.events) {
        user.events = user.events.filter((request) => !request.equals(event._id));
        await user.save();
    }

    await Event.deleteOne(event._id);

    res.status(StatusCodes.OK).json({
        user: user.username,
        msg: 'Successfully deleted the event.'
    });
}

export const joinEvent = async (req: Request, res: Response) => {
    const { eventId } = req.params;

    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new error.NotFoundError('User not found associated with token');
    }

    const event = await Event.findOne({ _id: eventId });

    if (!event) {
      throw new error.NotFoundError('Event not found');
    }

    const isInvited = event.invitedUsers?.includes(userId);

    if (isInvited) {
        event.invitedUsers = event.invitedUsers?.filter(invitedUserId => invitedUserId.toString() !== userId);
        event.joinedUsers?.push(userId);
        await event.save();
  
        res.status(StatusCodes.OK).json({ msg: 'User joined the event successfully' });
    } else {
        res.status(StatusCodes.FORBIDDEN).json({ msg: 'User is not invited to this event' });
    }
};

export const unJoinEvent = async (req: Request, res: Response) => {
    const { eventId } = req.params;

    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new error.NotFoundError('User not found associated with token');
    }

    const event = await Event.findOne({ _id: eventId });

    if (!event) {
      throw new error.NotFoundError('Event not found');
    }

    const isJoined = event.joinedUsers?.includes(userId);

    if (isJoined) {
        event.joinedUsers = event.joinedUsers?.filter(joinedUserId => joinedUserId.toString() !== userId);
        event.invitedUsers?.push(userId);
        await event.save();

        res.status(StatusCodes.OK).json({ msg: 'User unjoined the event successfully' });
    } else {
        res.status(StatusCodes.FORBIDDEN).json({ msg: 'User is not joined in this event' });
    }
};

export const showParticipants = async (req: Request, res: Response) => {
  const { eventId } = req.params;

  const authHeader = req.headers.authorization;
  if(!authHeader){
      throw new error.BadRequestError(`Please provide Bearer Token`);
  }

  const token = authHeader.split(' ')[1];
  const decodedToken = decodeToken(token);
  const userId = decodedToken.id;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new error.NotFoundError('User not found associated with token');
  }

  const event = await Event.findOne({
    _id: eventId
  })
  .populate([
    {
      path: 'owner',
      select: '-_id username realname profilePic',
    },
    {
      path: 'joinedUsers',
      select: 'username realname profilePic',
    },
  ])
  .select('owner joinedUsers');

  console.log("yo");
  

  if (!event) {
    throw new error.NotFoundError('Event not found');
  }

    res.status(StatusCodes.OK).json({
      event
    });
};

export const allEvents = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;
    const username = decodeToken.name;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new error.NotFoundError('User not found associated with token');
    }

    const { page, limit } = req.query;

    if(!page){
        throw new error.BadRequestError(`Page wasn't provided.`);
    }

    if(!limit){
        throw new error.BadRequestError(`Limit wasn't provided.`);
    }

    const typedPage: number = parseInt(page as string, 10);
    const typedLimit: number = parseInt(limit as string, 10);

    if(typedPage < 1){
        throw new error.BadRequestError(`Page cannot be less than 1.`);
    }

    if(typedLimit < 0){
        throw new error.BadRequestError(`Limit cannot be less than 0.`);
    }

    const totalCount: number = await Event.countDocuments({}); // Get total count of documents
    let totalPages: number = Math.ceil(totalCount / typedLimit); // Calculate total number of pages

    if(typedLimit === 0) totalPages = 1;

    let skip: number = (typedPage - 1) * typedLimit;

    // Calculate the skip value for fetching all previous pages
    if(typedPage > 1){
        skip = (typedPage - 1) * typedLimit + typedLimit * (typedPage - 2);
    }

    const populatedEvents = await Event.find({})
    .skip(skip)
    .limit(typedLimit)
    .sort({ createdAt: -1 }) // Sort in descending order by createdAt
    .populate([
        {
          path: 'owner',
          select: '-_id username realname profilePic',
        },
        {
          path: 'invitedUsers',
          select: 'username realname profilePic',
        },
        {
          path: 'joinedUsers',
          select: 'username realname profilePic',
        },
    ]);

    console.log(user._id);

    const formattedEvents = populatedEvents.map((event) => {
        const createdAt = moment(event.createdAt);
        const currentTimestamp = moment();
        const duration = moment.duration(currentTimestamp.diff(createdAt));

        let formattedDate = '';
        if (duration.asSeconds() < 60) {
          formattedDate = `posted ${Math.floor(duration.asSeconds())}s ago`;
        } else if (duration.asMinutes() < 60) {
          formattedDate = `posted ${Math.floor(duration.asMinutes())}m ago`;
        } else if (duration.asHours() < 24) {
          formattedDate = `posted ${Math.floor(duration.asHours())}h ago`;
        } else if (duration.asDays() < 30) {
          formattedDate = `posted ${Math.floor(duration.asDays())}d ago`;
        } else if (duration.asMonths() < 12) {
          formattedDate = `posted ${Math.floor(duration.asMonths())}mon ago`;
        } else {
          formattedDate = `posted ${Math.floor(duration.asYears())}yr ago`;
        }

        const formattedDateAndTimeOfEvent = moment(event.dateAndTimeOfEvent)
        .local()
        .format('ddd MMM DD, YYYY HH:mm');

        const isInvited = event.invitedUsers?.some((invitedUserId) =>
          invitedUserId.equals(user?._id)
        );
        const isJoined = event.joinedUsers?.some((joinedUserId) =>
          joinedUserId.equals(user?._id)
        );

        return {
            ...event.toObject(),
            createdAt: formattedDate,
            dateAndTimeOfEvent: formattedDateAndTimeOfEvent,
            invited: isInvited,
            joined: isJoined,
        };
    });

    res.status(StatusCodes.OK).json({
        user: user.username,
        currentPage: typedPage,
        eventsOnPage: populatedEvents.length,
        totalEvents: totalCount,
        totalPages: totalPages,
        formattedEvents
    });
};

export const allYourEvents = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new error.NotFoundError('User not found associated with token');
    }

    const { page, limit } = req.query;

    if(!page){
        throw new error.BadRequestError(`Page wasn't provided.`);
    }

    if(!limit){
        throw new error.BadRequestError(`Limit wasn't provided.`);
    }

    const typedPage: number = parseInt(page as string, 10);
    const typedLimit: number = parseInt(limit as string, 10);

    if(typedPage < 1){
        throw new error.BadRequestError(`Page cannot be less than 1.`);
    }

    if(typedLimit < 0){
        throw new error.BadRequestError(`Limit cannot be less than 0.`);
    }

    // Not that optimal since we are finding twice
    const totalCount: number = await Event
    .find( { owner: user._id } )
    .populate({
        path: 'owner',
        select: '-_id username realname profilePic',
    })
    .countDocuments({});

    let totalPages: number = Math.ceil(totalCount / typedLimit); // Calculate total number of pages

    if(typedLimit === 0) totalPages = 1;

    let skip: number = (typedPage - 1) * typedLimit;

    // Calculate the skip value for fetching all previous pages
    if(typedPage > 1){
        skip = (typedPage - 1) * typedLimit + typedLimit * (typedPage - 2);
    }

    const populatedEvents = await Event.find({ owner: user._id })
    .skip(skip)
    .limit(typedLimit)
    .sort({ createdAt: -1 }) // Sort in descending order by createdAt
    .populate([
        {
          path: 'owner',
          select: '-_id username realname profilePic',
        },
        {
          path: 'invitedUsers',
          select: 'username realname profilePic',
        },
        {
          path: 'joinedUsers',
          select: 'username realname profilePic',
        },
    ]);

    const formattedEvents = populatedEvents.map((event) => {
        const createdAt = moment(event.createdAt);
        const currentTimestamp = moment();
        const duration = moment.duration(currentTimestamp.diff(createdAt));

        let formattedDate = '';
        if (duration.asSeconds() < 60) {
          formattedDate = `posted ${Math.floor(duration.asSeconds())}s ago`;
        } else if (duration.asMinutes() < 60) {
          formattedDate = `posted ${Math.floor(duration.asMinutes())}m ago`;
        } else if (duration.asHours() < 24) {
          formattedDate = `posted ${Math.floor(duration.asHours())}h ago`;
        } else if (duration.asDays() < 30) {
          formattedDate = `posted ${Math.floor(duration.asDays())}d ago`;
        } else if (duration.asMonths() < 12) {
          formattedDate = `posted ${Math.floor(duration.asMonths())}mon ago`;
        } else {
          formattedDate = `posted ${Math.floor(duration.asYears())}yr ago`;
        }

        const formattedDateAndTimeOfEvent = moment(event.dateAndTimeOfEvent)
        .local()
        .format('ddd MMM DD, YYYY HH:mm');

        return {
            ...event.toObject(),
            createdAt: formattedDate,
            dateAndTimeOfEvent: formattedDateAndTimeOfEvent,
        };
    });

    res.status(StatusCodes.OK).json({
        user: user.username,
        currentPage: typedPage,
        eventsOnPage: populatedEvents.length,
        totalEvents: totalCount,
        totalPages: totalPages,
        formattedEvents
    });
};

export const allYourFriendsEvents = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new error.NotFoundError('User not found associated with token');
    }

    const { page, limit } = req.query;

    if(!page){
        throw new error.BadRequestError(`Page wasn't provided.`);
    }

    if(!limit){
        throw new error.BadRequestError(`Limit wasn't provided.`);
    }

    const typedPage: number = parseInt(page as string, 10);
    const typedLimit: number = parseInt(limit as string, 10);

    if(typedPage < 1){
        throw new error.BadRequestError(`Page cannot be less than 1.`);
    }

    if(typedLimit < 0){
        throw new error.BadRequestError(`Limit cannot be less than 0.`);
    }

    const totalCount: number = await Event.countDocuments({}); // Get total count of documents
    let totalPages: number = Math.ceil(totalCount / typedLimit); // Calculate total number of pages

    if(typedLimit === 0) totalPages = 1;

    let skip: number = (typedPage - 1) * typedLimit;

    // Calculate the skip value for fetching all previous pages
    if(typedPage > 1){
        skip = (typedPage - 1) * typedLimit + typedLimit * (typedPage - 2);
    }

    const friendIds = user.friends?.map((friend) => friend._id);
    const populatedEvents = await Event.find({
        $or: [
            { owner: user._id },
            { owner: { $in: friendIds } }
        ]
    })
    .skip(skip)
    .limit(typedLimit)
    .sort({ createdAt: -1 }) // Sort in descending order by createdAt
    .populate([
        {
          path: 'owner',
          select: '-_id username realname profilePic',
        },
        {
          path: 'invitedUsers',
          select: 'username realname profilePic',
        },
        {
          path: 'joinedUsers',
          select: 'username realname profilePic',
        },
    ]);

    const formattedEvents = populatedEvents.map((event) => {
        const createdAt = moment(event.createdAt);
        const currentTimestamp = moment();
        const duration = moment.duration(currentTimestamp.diff(createdAt));

        let formattedDate = '';
        if (duration.asSeconds() < 60) {
          formattedDate = `posted ${Math.floor(duration.asSeconds())}s ago`;
        } else if (duration.asMinutes() < 60) {
          formattedDate = `posted ${Math.floor(duration.asMinutes())}m ago`;
        } else if (duration.asHours() < 24) {
          formattedDate = `posted ${Math.floor(duration.asHours())}h ago`;
        } else if (duration.asDays() < 30) {
          formattedDate = `posted ${Math.floor(duration.asDays())}d ago`;
        } else if (duration.asMonths() < 12) {
          formattedDate = `posted ${Math.floor(duration.asMonths())}mon ago`;
        } else {
          formattedDate = `posted ${Math.floor(duration.asYears())}yr ago`;
        }

        const formattedDateAndTimeOfEvent = moment(event.dateAndTimeOfEvent)
        .local()
        .format('ddd MMM DD, YYYY HH:mm');

        
        const isInvited = event.invitedUsers?.some((invitedUserId) =>
          invitedUserId.equals(user?._id)
        );
        const isJoined = event.joinedUsers?.some((joinedUserId) =>
          joinedUserId.equals(user?._id)
        );

        return {
            ...event.toObject(),
            createdAt: formattedDate,
            dateAndTimeOfEvent: formattedDateAndTimeOfEvent,
            invited: isInvited,
            joined: isJoined,
        };
    });

    const checkForPrivateEvents = formattedEvents.filter((event) => {
        const isInvited = event.invitedUsers?.includes(userId);
        const isJoined = event.joinedUsers?.includes(userId);
      
        // Filter out events where the user is neither invited nor joined and the privacy type is "Private"
        if (event.privacyType === "Private" && (isInvited || isJoined)) {
          return false;
        }
      
        return true;
    });

    res.status(StatusCodes.OK).json({
        user: user.username,
        currentPage: typedPage,
        eventsOnPage: populatedEvents.length,
        totalEvents: totalCount,
        totalPages: totalPages,
        formattedEvents: checkForPrivateEvents
    });
};

export const allPublicExcludingFriendsEvents = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new error.NotFoundError('User not found associated with token');
    }

    const { page, limit } = req.query;

    if(!page){
        throw new error.BadRequestError(`Page wasn't provided.`);
    }

    if(!limit){
        throw new error.BadRequestError(`Limit wasn't provided.`);
    }

    const typedPage: number = parseInt(page as string, 10);
    const typedLimit: number = parseInt(limit as string, 10);

    if(typedPage < 1){
        throw new error.BadRequestError(`Page cannot be less than 1.`);
    }

    if(typedLimit < 0){
        throw new error.BadRequestError(`Limit cannot be less than 0.`);
    }

    const totalCount: number = await Event.countDocuments({}); // Get total count of documents
    let totalPages: number = Math.ceil(totalCount / typedLimit); // Calculate total number of pages

    if(typedLimit === 0) totalPages = 1;

    let skip: number = (typedPage - 1) * typedLimit;

    // Calculate the skip value for fetching all previous pages
    if(typedPage > 1){
        skip = (typedPage - 1) * typedLimit + typedLimit * (typedPage - 2);
    }

    const friendIds = user.friends?.map((friend) => friend._id);

    // get all posts classified as "Anyone" exlcuding friends no matter the privacy type
    const populatedEvents = await Event.find({ 
        privacyType: 'Anyone',
        owner: { $nin: friendIds }
    })
    .skip(skip)
    .limit(typedLimit)
    .sort({ createdAt: -1 })
    .populate([
        {
          path: 'owner',
          select: '-_id username realname profilePic',
        },
        {
          path: 'invitedUsers',
          select: 'username realname profilePic',
        },
        {
          path: 'joinedUsers',
          select: 'username realname profilePic',
        },
    ]);

    const formattedEvents = populatedEvents.map((event) => {
        const createdAt = moment(event.createdAt);
        const currentTimestamp = moment();
        const duration = moment.duration(currentTimestamp.diff(createdAt));

        let formattedDate = '';
        if (duration.asSeconds() < 60) {
          formattedDate = `posted ${Math.floor(duration.asSeconds())}s ago`;
        } else if (duration.asMinutes() < 60) {
          formattedDate = `posted ${Math.floor(duration.asMinutes())}m ago`;
        } else if (duration.asHours() < 24) {
          formattedDate = `posted ${Math.floor(duration.asHours())}h ago`;
        } else if (duration.asDays() < 30) {
          formattedDate = `posted ${Math.floor(duration.asDays())}d ago`;
        } else if (duration.asMonths() < 12) {
          formattedDate = `posted ${Math.floor(duration.asMonths())}mon ago`;
        } else {
          formattedDate = `posted ${Math.floor(duration.asYears())}yr ago`;
        }

        const formattedDateAndTimeOfEvent = moment(event.dateAndTimeOfEvent)
        .local()
        .format('ddd MMM DD, YYYY HH:mm');

        return {
            ...event.toObject(),
            createdAt: formattedDate,
            dateAndTimeOfEvent: formattedDateAndTimeOfEvent,
        };
    });

    res.status(StatusCodes.OK).json({
        user: user.username,
        currentPage: typedPage,
        eventsOnPage: populatedEvents.length,
        totalEvents: totalCount,
        totalPages: totalPages,
        formattedEvents
    });
};

export const allSearchedUserEvents = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new error.NotFoundError('User not found associated with token');
    }

    const { page, limit, searchedUser } = req.query;

    if(!page){
        throw new error.BadRequestError(`Page wasn't provided.`);
    }

    if(!limit){
        throw new error.BadRequestError(`Limit wasn't provided.`);
    }

    if (!searchedUser) {
        throw new error.NotFoundError(`Searched user wasn't provided.`);
    }

    const lookedUpUser = await User.findOne({ username: searchedUser });
    if (!lookedUpUser){
        throw new error.NotFoundError(`Searched User ${searchedUser} not found.`);
    }

    const typedPage: number = parseInt(page as string, 10);
    const typedLimit: number = parseInt(limit as string, 10);

    if(typedPage < 1){
        throw new error.BadRequestError(`Page cannot be less than 1.`);
    }

    if(typedLimit < 0){
        throw new error.BadRequestError(`Limit cannot be less than 0.`);
    }

    const totalCount: number = await Event.countDocuments({}); // Get total count of documents
    let totalPages: number = Math.ceil(totalCount / typedLimit); // Calculate total number of pages

    if(typedLimit === 0) totalPages = 1;

    let skip: number = (typedPage - 1) * typedLimit;

    // Calculate the skip value for fetching all previous pages
    if(typedPage > 1){
        skip = (typedPage - 1) * typedLimit + typedLimit * (typedPage - 2);
    }

    let populatedEvents;

    // If searched user isn't a friend, then filter out the "Friends Only" events
    if(!user.friends?.some((request) => request.equals(lookedUpUser._id))){
        populatedEvents = await Event.find({ 
            privacyType: 'Anyone',
            owner: { $in: lookedUpUser._id },
        })
        .skip(skip)
        .limit(typedLimit)
        .sort({ createdAt: -1 })
        .populate([
            {
              path: 'owner',
              select: '-_id username realname profilePic',
            },
            {
              path: 'invitedUsers',
              select: 'username realname profilePic',
            },
            {
              path: 'joinedUsers',
              select: 'username realname profilePic',
            },
        ]);
    } else { // User is friend, so just get all events
        populatedEvents = await Event.find({ 
            owner: { $in: lookedUpUser._id }
        })
        .skip(skip)
        .limit(typedLimit)
        .sort({ createdAt: -1 })
        .populate([
        {
          path: 'owner',
          select: '-_id username realname profilePic',
        },
        {
          path: 'invitedUsers',
          select: 'username realname profilePic',
        },
        {
          path: 'joinedUsers',
          select: 'username realname profilePic',
        },
    ]);
    }

    const formattedEvents = populatedEvents.map((event) => {
        const createdAt = moment(event.createdAt);
        const currentTimestamp = moment();
        const duration = moment.duration(currentTimestamp.diff(createdAt));

        let formattedDate = '';
        if (duration.asSeconds() < 60) {
          formattedDate = `posted ${Math.floor(duration.asSeconds())}s ago`;
        } else if (duration.asMinutes() < 60) {
          formattedDate = `posted ${Math.floor(duration.asMinutes())}m ago`;
        } else if (duration.asHours() < 24) {
          formattedDate = `posted ${Math.floor(duration.asHours())}h ago`;
        } else if (duration.asDays() < 30) {
          formattedDate = `posted ${Math.floor(duration.asDays())}d ago`;
        } else if (duration.asMonths() < 12) {
          formattedDate = `posted ${Math.floor(duration.asMonths())}mon ago`;
        } else {
          formattedDate = `posted ${Math.floor(duration.asYears())}yr ago`;
        }

        const formattedDateAndTimeOfEvent = moment(event.dateAndTimeOfEvent)
        .local()
        .format('ddd MMM DD, YYYY HH:mm');
        
        const isInvited = event.invitedUsers?.some((invitedUserId) =>
          invitedUserId.equals(user?._id)
        );
        const isJoined = event.joinedUsers?.some((joinedUserId) =>
          joinedUserId.equals(user?._id)
        );

        return {
            ...event.toObject(),
            createdAt: formattedDate,
            dateAndTimeOfEvent: formattedDateAndTimeOfEvent,
            invited: isInvited,
            joined: isJoined,
        };
    });

    res.status(StatusCodes.OK).json({
        user: user.username,
        currentPage: typedPage,
        eventsOnPage: populatedEvents.length,
        totalEvents: totalCount,
        totalPages: totalPages,
        formattedEvents
    });
};

export const singleEvent = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new error.BadRequestError(`Please provide Bearer Token`);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = decodeToken(token);
    const userId = decodedToken.id;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new error.NotFoundError('User not found associated with token');
    }

    const { eventId } = req.params;


    if (!eventId || !mongoose.Types.ObjectId.isValid(eventId)) {
        throw new error.BadRequestError(`Please provide a valid event id in params`);
    }

    const populatedEvent = await Event.find({ _id: eventId, })
    .populate([
        {
          path: 'owner',
          select: '-_id username realname profilePic',
        },
        {
          path: 'invitedUsers',
          select: 'username realname profilePic',
        },
        {
          path: 'joinedUsers',
          select: 'username realname profilePic',
        },
    ]);

    // could provide a double check if your friends with the user who posted the event
    // and check if the privacy type is "Friends Only"

    if(!populatedEvent){
        throw new error.BadRequestError(`Couldn't find event.`);
    }

    const formattedEvent = populatedEvent.map((event) => {
        const createdAt = moment(event.createdAt);
        const currentTimestamp = moment();
        const duration = moment.duration(currentTimestamp.diff(createdAt));

        let formattedDate = '';
        if (duration.asSeconds() < 60) {
          formattedDate = `posted ${Math.floor(duration.asSeconds())}s ago`;
        } else if (duration.asMinutes() < 60) {
          formattedDate = `posted ${Math.floor(duration.asMinutes())}m ago`;
        } else if (duration.asHours() < 24) {
          formattedDate = `posted ${Math.floor(duration.asHours())}h ago`;
        } else if (duration.asDays() < 30) {
          formattedDate = `posted ${Math.floor(duration.asDays())}d ago`;
        } else if (duration.asMonths() < 12) {
          formattedDate = `posted ${Math.floor(duration.asMonths())}mon ago`;
        } else {
          formattedDate = `posted ${Math.floor(duration.asYears())}yr ago`;
        }

        const formattedDateAndTimeOfEvent = moment(event.dateAndTimeOfEvent)
        .local()
        .format('ddd MMM DD, YYYY HH:mm');

        const isInvited = event.invitedUsers?.some((invitedUserId) =>
          invitedUserId.equals(user?._id)
        );
        const isJoined = event.joinedUsers?.some((joinedUserId) =>
          joinedUserId.equals(user?._id)
        );

        return {
            ...event.toObject(),
            createdAt: formattedDate,
            dateAndTimeOfEvent: formattedDateAndTimeOfEvent,
            invited: isInvited,
            joined: isJoined,
        };
    });

    res.status(StatusCodes.OK).json({
        user: user.username,
        formattedEvent
    });
};

export const deleteAllEvents = async (req: Request, res: Response) => {
    await Event.deleteMany();

    res.status(StatusCodes.OK).json({
        msg: "All Events are deleted"
    });
}

// get single post
// done - all posts that privacy is set to anyone excluding friends
// done - get all your events
// done - get all friends posts no matter the privacy

// done -   get posts by user
//          check if user if friend:
//          return all posts by friend,
//          else return all posts that isnt friends only