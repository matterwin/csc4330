import mongoose  from 'mongoose';

type MessageModel = {
    user: mongoose.Types.ObjectId | undefined,
    message: string,
};

const MessageSchema = new mongoose.Schema<MessageModel>({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
        maxlength: [256, "Message cannot exceed 256 characters"],
        minlength: [1, "Message must be at least 1 character long"]
    },
}, { timestamps: true });

MessageSchema.index({ createdAt: -1 });

export const MessageModel = mongoose.model<MessageModel>('Message', MessageSchema);
