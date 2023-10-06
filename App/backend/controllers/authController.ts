import { Request, Response } from 'express';
import { comparePassword, UserModel as User } from '../models/User';
import { TokenModel as Token } from '../models/Token';
import { StatusCodes } from 'http-status-codes';
import { createJWT, isTokenValid } from '../utils/jwt';
import { decodeToken } from '../utils/jwt';
import * as error from '../errors';

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    console.log(username + " " + email + " " + password);
    
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
        const userToken = { token, user: user._id };
        await Token.create(userToken);
        res.status(StatusCodes.CREATED).json({
            msg: 'Success! Account created.',
            token
        })
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
        if (existingToken.isValid && isTokenValid(existingToken.token)) { //checks stateful and stateless JWT
            // Reuse valid token
            res.status(StatusCodes.OK).json({
                msg: 'Success! User has an existing valid token',
                token: existingToken.token
            });
            return;
        } else {
            // Token is invalid, generate a new token and update the existing one
            token = createJWT({ id: user._id, username });
            existingToken.token = token;
            existingToken.isValid = true;
            await existingToken.save();
        }
    }

    res.status(StatusCodes.OK).json({
        msg: `Success! Created a new token for User ${user.username}`,
        token
    });
}

export const logout = async (req: Request, res: Response) => {
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

    const existingToken = await Token.findOne({ user: user._id });
    if(!existingToken){
        throw new error.NotFoundError("User token is non existent");
    }
    if(!existingToken.isValid){
        throw new error.BadRequestError(`User ${user.username} is already signed out`);
    }
    existingToken.isValid = false;
    await existingToken.save();

    res.status(StatusCodes.OK).json({ 
        msg: `User ${user.username} logged out.`,
        isTokenValid: existingToken.isValid
    });
}

// limitations with stateful jwt
// whenever a jwt expires, there is a need to invalidate the state of the jwt in our Db.
// One way to do this is we once a user tries to reach an authenticated routed, we need to make the user sign in again if the token is invalid