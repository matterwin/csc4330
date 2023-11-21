import mongoose  from 'mongoose';

type DirectMessageModel = {
    userOne: mongoose.Types.ObjectId | undefined,
    userTwo: mongoose.Types.ObjectId | undefined,
    messages: mongoose.Types.ObjectId[] | undefined,
};

const DirectMessageSchema = new mongoose.Schema<DirectMessageModel>({
    userOne: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userTwo: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
    ],
}, { timestamps: true });

DirectMessageSchema.index({ createdAt: -1 });

export const DirectMessageModel = mongoose.model<DirectMessageModel>('DirectMessage', DirectMessageSchema);
