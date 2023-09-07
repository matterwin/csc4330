import { Request, Response } from 'express';
import User from '../models/User';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../errors';

const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    
    if(!username || !email || !password){
        throw new CustomError.BadRequestError(`Please provide all values`);
    }

    const usernameAlreadyExists = await User.findOne({ username })
    if (usernameAlreadyExists) {
        throw new CustomError.BadRequestError(`Username: ${username} already in use.`);
    }

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError(`Email: ${email} already in use.`);
    }

    await User.create({ 
        username, 
        email, 
        password 
    });

    res.status(StatusCodes.CREATED).json({
        msg: 'Success! Account created.',
    });
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if(!email || !password){
        console.log("Json is empty");
        return;
    }

    res.status(200).json("Login test");
}

export { 
    login, 
    register 
};
