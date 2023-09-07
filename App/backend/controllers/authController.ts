import { Request, Response } from 'express';
import{ comparePassword, UserModel as User } from '../models/User';
import { StatusCodes } from 'http-status-codes';
import { createJWT } from '../utils/jwt';
import * as error from '../errors'

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    
    if(!username || !email || !password){
        throw new error.BadRequestError(`Please provide all values`);
    }

    const usernameAlreadyExists = await User.findOne({ username })
    if (usernameAlreadyExists) {
        throw new error.BadRequestError(`Username: ${username} already in use.`);
    }

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
        throw new error.BadRequestError(`Email: ${email} already in use.`);
    }

    const user = await User.create({ 
        username, 
        email, 
        password 
    });

    res.status(StatusCodes.CREATED).json({
        msg: 'Success! Account created.',
        user
    });
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if(!username || !password){
        throw new error.BadRequestError(`Please provide all values`);
    }

    const user = await User.findOne({ username });
    if(!user){
        throw new error.BadRequestError(`No such username exists: ${username}`);
    }

    const doesPasswordMatch = await comparePassword(user, password);
    if(!doesPasswordMatch){
        throw new error.BadRequestError(`Invalid credentials, password does not match.`);
    }

    const token = createJWT({id: user._id, username});

    res.status(StatusCodes.OK).json({
        msg: 'Success! Logging you in now.',
        token
    });
}