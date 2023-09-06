import { Request, Response } from 'express';
const User = require('../models/User');
const errorHandler = require('../middleware/error-handler');

const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    
    if(!username || !email || !password){
        return res.status(400).json("Username or email or password invalid");
    }

    const usernameAlreadyExists = await User.findOne({ username })
    if (usernameAlreadyExists) {
        return res.status(400).json(`Username: ${username} already in use.`);
    }

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
        return res.status(400).json(`Email: ${email} already in use.`);
    }

    res.status(201).json({
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
