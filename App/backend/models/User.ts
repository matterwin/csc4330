import mongoose  from 'mongoose';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';

type UserModel = {
    username: string,
    email: string,
    password: string,
    role: string,
    createdAt: Date,
    updatedAt: Date
};

const UserSchema = new mongoose.Schema<UserModel>({
    username: {
        type: String,
        unique: true,
        required: [true, 'Please provide username'],
        minlength: [2, 'Username length must be at least 2 characters, minimum.'],
        maxlength: [20, 'Username length can not surpass 5 characters, maximum.'],
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
        minlength: [4, 'Password length must be at least 5 characters, minimum.'],
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
