import { Request, Response } from 'express';
import { UserModel as User } from '../models/User';
import { HobbyModel as Hobby } from '../models/Hobby';
import { StatusCodes } from 'http-status-codes';
import { decodeToken } from '../utils/jwt';
import * as error from '../errors'

interface Hobby {
    hobbyType: string;
    hobby: string;
}

export const initHobbies = async (req: Request, res: Response) => {
    const hobbyList = [
        { type: 'lifestyle', defaultValues: ['Yoga', 'Traveling', 'Meditation', 'Photography', 'Fashion', 'Cooking', 'Gardening'] },
        { type: 'sports', defaultValues: ['Soccer', 'Cycling', 'Swimming', 'Running', 'Basketball', 'Surfing', 'Yoga'] },
        { type: 'creativity', defaultValues: ['Painting', 'Writing', 'Crafting', 'Music Composition', 'Photography', 'Graphic Design', 'Cooking'] },
        { type: 'outdoor', defaultValues: ['Hiking', 'Camping', 'Bird Watching', 'Fishing', 'Rock Climbing', 'Kayaking', 'Stargazing'] },
        { type: 'technology', defaultValues: ['Programming', 'Gaming', 'Robotics', '3D Printing', 'Virtual Reality', 'Cybersecurity', 'AI'] },
        { type: 'music', defaultValues: ['Playing Guitar', 'Singing', 'Piano', 'DJing', 'Music Production', 'Classical Instruments', 'Hip-Hop Dance'] },
        { type: 'gaming', defaultValues: ['Video Games', 'Board Games', 'Card Games', 'Role-Playing Games', 'Strategy Games', 'Chess', 'Escape Rooms'] },
        { type: 'cooking', defaultValues: ['Baking', 'Grilling', 'Vegetarian Cuisine', 'Ethnic Cooking', 'Meal Prep', 'Food Blogging', 'Wine Tasting'] },
        { type: 'reading', defaultValues: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Biography', 'Fantasy', 'Self-Help'] },
    ];

    const createdHobbies: Hobby[] = hobbyList.flatMap(({ type, defaultValues }) =>
        defaultValues.map(hobby => ({ hobbyType: type, hobby }))
    );

    if(createdHobbies){
        for (const hobby of createdHobbies) {
            const newHobby = new Hobby(hobby);
            await newHobby.save();
        }
    }

    res.status(StatusCodes.CREATED).json({
        msg: 'Hobbies initiated',
        createdHobbies
    });
};

export const showAllHobbies = async (req: Request, res: Response) => {
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

    const allHobbies = await Hobby.find({});

    res.status(StatusCodes.OK).json({
        hobbies: allHobbies
    });
};

export const showAllHobbiesWithFilter = async (req: Request, res: Response) => {
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

    const allHobbies = await Hobby.find({});

    const formattedHobbies = allHobbies.map((otherHobby) => {
        const alreadyHasHobby = user.hobbies?.includes(otherHobby.hobby) || false;

        return {
            ...otherHobby.toObject(),
            alreadyHasHobby: alreadyHasHobby,
        };
    });

    res.status(StatusCodes.OK).json({
        hobbies: formattedHobbies,
    });
};

export const showUsersHobbies = async (req: Request, res: Response) => {
    console.log("here");
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

    const { searchedUser } = req.params;

    if (!searchedUser) {
        throw new error.NotFoundError(`Searched user wasn't provided.`);
    }

    const lookedUpUser = await User.findOne({ username: searchedUser })

    if (!lookedUpUser){
        throw new error.NotFoundError(`Searched User ${searchedUser} not found.`);
    }

    res.status(StatusCodes.OK).json({
        searchedUser: lookedUpUser.username,
        hobbies: lookedUpUser.hobbies.reverse()
    });
};

export const addHobbyToUser = async (req: Request, res: Response) => {
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

    const { hobby } = req.body;

    if(!hobby){
        throw new error.BadRequestError(`HobbyType of Hobby not found`);
    }

    const hobbyFromModel = await Hobby.findOne({
        hobby: hobby,
    });

    if (!hobbyFromModel) {
        throw new error.NotFoundError(`Hobby '${hobby}' not found.'`);
    }

    user.hobbies?.push(hobby);
    await user.save();

    res.status(StatusCodes.OK).json({
        user: user.username,
        msg: `Added '${hobby}' to user hobby list.`
    });
};

export const deleteHobbyForUser = async (req: Request, res: Response) => {
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

    const { hobby } = req.body;

    if(!hobby){
        throw new error.BadRequestError(`HobbyType of Hobby not found`);
    }

    const hobbyFromModel = await Hobby.findOne({
        hobby: hobby,
    });

    if (!hobbyFromModel) {
        throw new error.NotFoundError(`Hobby '${hobby}' not found.'`);
    }

    user.hobbies = user.hobbies?.filter(userHobby => userHobby !== hobby);
    await user.save();
    
    res.status(StatusCodes.OK).json({
        user: user.username,
        msg: `Deleted '${hobby}' from user hobby list.`
    });
};