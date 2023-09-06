import { Request, Response } from 'express';
const User = require('../models/User');
const errorHandler = require('../middleware/error-handler');

const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    
    if(!username || !email || !password){
        res.status(400).json({msg: "Username or email or password invalid"});
        return;
    }

    const usernameAlreadyExists = await User.findOne({ username })
    if (usernameAlreadyExists) {
        res.status(400).json({msg: `Username: ${username} already in use.`});
        return;
    }

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
        res.status(400).json({msg: `Email: ${email} already in use.`});
        return;
    }

    const user = await User.create({ 
        username, 
        email, 
        password 
    });

    res.status(201).json({
        msg: 'Success! Account created.',
        user
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
