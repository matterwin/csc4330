import { Request, Response } from 'express';
const path = require('path');
import { UserModel as User } from '../models/User';
const { StatusCodes } = require('http-status-codes');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
import * as error from '../errors'

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

export const changeProfileImage = async (req: Request, res:Response) => {
//   const { userId } = req.params;
//   console.log(req.params);
//   console.log("changeProfileImage called");

//   if (!userId)
//     throw new error.BadRequestError('Provide userId');

//   const user = await User.findOne({ _id: userId });
//   if (!user)
//     throw new error.BadRequestError('userId is invalid');

//   const result = await cloudinary.uploader.upload(
//     req.files.image.tempFilePath,
//     {
//       use_filename: true,
//       folder: 'file-upload',
//     }
//   );
//   fs.unlinkSync(req.files.image.tempFilePath);

//   user.profilePic = result.secure_url; // Update the profilePic field with the new image URL
//   await user.save(); // Save the updated user object

//   return res.status(StatusCodes.CREATED).json({ msg: 'Profile picture changed successfully' });
};
