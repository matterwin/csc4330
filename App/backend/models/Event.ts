import mongoose  from 'mongoose';

type EventModel = {
    owner: mongoose.Types.ObjectId | undefined,
    eventPicture: string,
    titleOfEvent: string,
    place: string,
    exactLocation: string,
    timeOfEvent: string,
    description: string,
    privacyType: string
    createdAt: Date,
    updatedAt: Date,
};

const EventSchema = new mongoose.Schema<EventModel>({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    titleOfEvent: {
        type: String,
        required: [true, 'Please provide the title of the event.'],
        maxlength: [12, "Title cannot surpass 12 characters"],
    },
    place: {
        type: String,
        required: [true, 'Please provide a general place for event.'],
        maxlength: [12, "Place cannot surpass 12 characters"],
    },
    privacyType: {
        type: String,
        enum: ['Private', 'Public'],
        required: true,
    },
    eventPicture: {
        type: String
    },
    exactLocation: {
        type: String,
        maxlength: [50, "Location cannot surpass 50 characters"],
    },
    description: {
        type: String,
        maxlength: [150, "Description cannot surpass 150 characters"],
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

export const UserModel = mongoose.model<EventModel>('Event', EventSchema);