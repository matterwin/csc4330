import { Request, Response } from 'express';
import { UserModel as User } from '../models/User';
import { EventModel as Event } from '../models/Event';
import { StatusCodes } from 'http-status-codes';
import { decodeToken } from '../utils/jwt';
import * as error from '../errors';
import mongoose from 'mongoose';

export const createEvent = async (req: Request, res: Response) => {
    const { 
        privacyType, // required
        titleOfEvent, //required
        place, //required
        eventImage,
        exactLocation,
        dateAndTimeOfEvent,
        description,
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

    if(!privacyType || privacyType != 'Friends Only' && privacyType != 'Anyone'){
        throw new error.BadRequestError(`Please provide the correct of privacyType: Friends Only or Anyone`);
    }

    if(!titleOfEvent || titleOfEvent.length < 1){
        throw new error.BadRequestError(`Please provide the title of the event`);
    }

    if(!place || place.length < 1){
        throw new error.BadRequestError(`Please provide the place of the event`);
    }

    const event = await Event.create({
        owner: user._id,
        privacyType,
        titleOfEvent,
        place,
        eventImage,
        exactLocation,
        dateAndTimeOfEvent,
        description
    });

    if(event) {
        user.events?.push(event._id);
        await user.save();
    }

    res.status(StatusCodes.CREATED).json({
        user: user.username,
        event
    });
}

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

// should see pagination for discover page should be all events listed as public 
// might have to mess with that
// might need to change privacytype of friends only and anymore can see

// discover page is anyone can see events
// friends page is all friends posts no matter what


// can do extra with invite only event

export const allEvents = async (req: Request, res: Response) => {
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

    const populatedEvents = await Event.find({})
    .skip(skip)
    .limit(typedLimit)
    .sort({ createdAt: -1 }) // Sort in descending order by createdAt

    res.status(StatusCodes.OK).json({
        currentPage: typedPage,
        eventsOnPage: populatedEvents.length,
        totalEvents: totalCount,
        totalPages: totalPages,
        populatedEvents
    });
};

export const deleteAllEvents = async (req: Request, res: Response) => {
    await Event.deleteMany();

    res.status(StatusCodes.OK).json({
        msg: "All Events are deleted"
    });
}