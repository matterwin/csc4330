import mongoose  from 'mongoose';

type EventModel = {
    owner: mongoose.Types.ObjectId | undefined,
    eventImage: string,
    titleOfEvent: string,
    place: string,
    exactLocation: string,
    dateAndTimeOfEvent: string,
    description: string,
    privacyType: string,
    createdAt: Date,
};

const EventSchema = new mongoose.Schema<EventModel>({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    privacyType: {
        type: String,
        enum: ['Friends Only', 'Anyone'],
        default: 'Anyone',
        required: true,
    },
    titleOfEvent: {
        type: String,
        required: [true, 'Please provide the title of the event.'],
        maxlength: [50, "Title cannot surpass 30 characters"],
    },
    place: {
        type: String,
        maxlength: [50, "Place cannot surpass 30 characters"],
    },
    eventImage: {
        type: String,
        default: null
    },
    exactLocation: {
        type: String,
        maxlength: [50, "Location cannot surpass 50 characters"],
    },
    description: {
        type: String,
        maxlength: [150, "Description cannot surpass 150 characters"],
    },
    dateAndTimeOfEvent: {
        type: String,
    },
}, { timestamps: true });

export const EventModel = mongoose.model<EventModel>('Event', EventSchema);