import mongoose  from 'mongoose';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';

type UserModel = {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    profilePic: string,
    bio: string,
    location: string,
    role: string,
    createdAt: Date,
    updatedAt: Date,
    events: mongoose.Types.ObjectId[] | undefined,
    hobbies: mongoose.Types.ObjectId[] | undefined,
    friends: mongoose.Types.ObjectId[] | undefined,
    sentFriendRequests: mongoose.Types.ObjectId[] | undefined,
    receivedFriendRequests: mongoose.Types.ObjectId[] | undefined,
};

const UserSchema = new mongoose.Schema<UserModel>({
    username: {
        type: String,
        unique: true,
        required: [true, 'Please provide username'],
        minlength: [2, 'Username length must be at least 2 characters, minimum.'],
        maxlength: [20, 'Username length can not surpass 20 characters, maximum.'],
    },
    firstname: {
        type: String,
        maxlength: [20, "Firstname cannot surpass 20 characters"],
    },
    lastname: {
        type: String,
        maxlength: [20, "Lastname cannot surpass 20 characters"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: (email: string) => { 
                return isEmail(email);
            },
            message: 'Please provide valid email',
        },
    },
    password: {
        type: String,
        required: [true, 'Provide password'],
        minlength: [4, 'Password length must be at least 4 characters, minimum.'],
    },
    profilePic:{
        type: String,
        default: 'https://res.cloudinary.com/dkqbgiqgu/image/upload/v1700106670/csc4330/tmp-1-1700106670580_s8rhev.png'
    },
    bio: {
        type: String,
        maxlength: [150, "Firstname cannot surpass 20 characters"],
    },
    location: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
    ],
    hobbies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hobby',
        },
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    sentFriendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    receivedFriendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

UserSchema.pre('save', async function (this: any) {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export const UserModel = mongoose.model<UserModel>('User', UserSchema);

export const comparePassword = async function (user: UserModel, inputPassword: string) {
    const isMatch = await bcrypt.compare(inputPassword, user.password);
    return isMatch;
};

// need to make event model, chat model (websocket thing)
// need to add more to user model like friends list, hobby list, event list, added you list