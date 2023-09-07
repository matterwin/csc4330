const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
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
            validator: validator.isEmail,
            message: 'Please provide valid email',
        },
    },
    password: {
        type: String,
        required: [true, 'Provide password'],
        minlength: [5, 'Password length must be at least 5 characters, minimum.'],
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

UserSchema.methods.comparePassword = async function (inputPassword: string) {
    const isMatch = await bcrypt.compare(inputPassword, this.password);
    return isMatch;
};

export default mongoose.model('User', UserSchema);