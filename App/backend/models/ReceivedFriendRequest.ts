import mongoose  from 'mongoose';

type ReceivedFriendRequestModel = {
    user: mongoose.Types.ObjectId | undefined,
    createdAt: Date,
    updatedAt: Date,
};

const ReceivedFriendRequestSchema = new mongoose.Schema<ReceivedFriendRequestModel>({
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

export const ReceivedFriendRequestModel = mongoose.model<ReceivedFriendRequestModel>('ReceivedFriendRequest', ReceivedFriendRequestSchema);