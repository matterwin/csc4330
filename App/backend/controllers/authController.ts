import { Request, Response } from 'express';

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if(!email || !password){
        console.log("Json is empty");
        return;
    }

    res.status(200).json("Login test");
}

const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    if(!email || !password){
        console.log("Json is empty");
        return;
    }

    res.status(200).json("Register test");
}

export { 
    login, 
    register 
};
