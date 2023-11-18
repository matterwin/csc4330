import mongoose  from 'mongoose';

type SentFriendRequestModel = {
    user: mongoose.Types.ObjectId | undefined,
    createdAt: Date,
    updatedAt: Date,
};

const SentFriendRequestSchema = new mongoose.Schema<SentFriendRequestModel>({
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

export const SentFriendRequestModel = mongoose.model<SentFriendRequestModel>('SentFriendRequest', SentFriendRequestSchema);