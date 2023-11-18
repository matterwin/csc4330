import mongoose  from 'mongoose';

type FriendModel = {
    user: mongoose.Types.ObjectId | undefined,
    createdAt: Date,
    updatedAt: Date,
};

const FriendSchema = new mongoose.Schema<FriendModel>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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

export const FriendModel = mongoose.model<FriendModel>('Friend', FriendSchema);

