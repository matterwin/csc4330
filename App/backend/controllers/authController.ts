import { Request, Response } from 'express';
import { comparePassword, UserModel as User } from '../models/User';
import { TokenModel as Token } from '../models/Token';
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
        username: username, 
        email: email,
        password: password
    });

    if(user){
        const token = createJWT({id: user._id, username});
        res.status(StatusCodes.CREATED).json({
            msg: 'Success! Account created.',
            token
        })
        const userToken = { token, user: user._id };
        await Token.create(userToken);
        return;
    }
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log(username + " " + password);
    

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

    let token = '';
    const existingToken = await Token.findOne({ user: user._id });
    if(existingToken){
        if (!existingToken.isValid) {
          throw new error.UnauthenticatedError('Invalid Credentials');
        }
        res.status(StatusCodes.OK).json({
            msg: 'Success! User has Existing Token',
            token: existingToken.token
        });
        return;
    }

    token = createJWT({id: user._id, username});
    const userToken = { token, user: user._id };
    await Token.create(userToken);

    res.status(StatusCodes.OK).json({
        msg: 'Success! With a newly created Token',
        token
    });
}

export const logout = async (req: Request, res: Response) => {
    // await Token.findOneAndDelete({ user: req.user.userId });

    res.status(StatusCodes.OK).json({ msg: 'User logged out.' });
}