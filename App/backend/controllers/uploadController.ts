import { Request, Response } from 'express';
const path = require('path');
import { UserModel as User } from '../models/User';
import { EventModel as Event } from '../models/Event';
const { StatusCodes } = require('http-status-codes');
import { decodeToken } from '../utils/jwt';
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
import * as error from '../errors';
import mongoose from 'mongoose';

interface ImageRequest extends Request {
    files?: any | undefined // any lol
}

export const uploadImage = async (req: ImageRequest, res:Response) => {
    if (!req.files || !req.files.image) {
        throw new error.BadRequestError('Please provide an image file');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if (!allowedMimeTypes.includes(req.files.image.mimetype)) {
        throw new error.BadRequestError('Invalid file type. Only JPEG and PNG files are allowed');
    }

    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath, {
            use_filename: true,
            folder: 'csc4330',
            // transformation: [{ width: 1280, height: 720, crop: 'fill' }], // we can crop to our liking
        }
    );
    fs.unlinkSync(req.files.image.tempFilePath);

    console.log(req.files.image);
    return res.status(StatusCodes.CREATED).json({ image: { src: result.secure_url } });
};

export const changeProfileImage = async (req: ImageRequest, res:Response) => {
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

    if (!req.files || !req.files.image) {
        throw new error.BadRequestError('Please provide an image file');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if (!allowedMimeTypes.includes(req.files.image.mimetype)) {
        throw new error.BadRequestError('Invalid file type. Only JPEG and PNG files are allowed');
    }

    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath, {
            use_filename: true,
            folder: 'csc4330',
            // transformation: [{ width: 1280, height: 720, crop: 'fill' }], // we can crop to our liking
        }
    );
    fs.unlinkSync(req.files.image.tempFilePath);

    user.profilePic = result.secure_url;
    await user.save();
    console.log(req.files.image);

    return res.status(StatusCodes.CREATED).json({ 
        msg: 'Successfully changed profile image',
        image: { src: result.secure_url } 
    });
};

export const uploadEventImage = async (req: ImageRequest, res:Response) => {
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

    const eventId = req.params.eventId;

    if(!eventId){
        throw new error.BadRequestError('Please provide an event id');
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
        throw new error.BadRequestError(`You are not authorized to upload an image for this event.`);
    }

    if (!req.files || !req.files.image) {
        throw new error.BadRequestError('Please provide an image file');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if (!allowedMimeTypes.includes(req.files.image.mimetype)) {
        throw new error.BadRequestError('Invalid file type. Only JPEG and PNG files are allowed');
    }

    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath, {
            use_filename: true,
            folder: 'csc4330',
            // transformation: [{ width: 1280, height: 720, crop: 'fill' }], // we can crop to our liking
        }
    );
    fs.unlinkSync(req.files.image.tempFilePath);

    event.eventImage = result.secure_url;
    await event.save();

    return res.status(StatusCodes.CREATED).json({ 
        msg: 'Successfully uploaded image for event',
        image: { src: result.secure_url } 
    });
};

export const uploadImageAuth = async (req: ImageRequest, res:Response) => {
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

    if (!req.files || !req.files.image) {
        throw new error.BadRequestError('Please provide an image file');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if (!allowedMimeTypes.includes(req.files.image.mimetype)) {
        throw new error.BadRequestError('Invalid file type. Only JPEG and PNG files are allowed');
    }

    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath, {
            use_filename: true,
            folder: 'csc4330',
            // transformation: [{ width: 1280, height: 720, crop: 'fill' }], // we can crop to our liking
        }
    );
    fs.unlinkSync(req.files.image.tempFilePath);

    return res.status(StatusCodes.CREATED).json({ 
        msg: 'Successfully uploaded image',
        image: { src: result.secure_url } 
    });
};
