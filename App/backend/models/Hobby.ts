import mongoose from 'mongoose';

type HobbyModel = {
  hobbyType: string,
  hobby: string;
};

const HobbySchema = new mongoose.Schema<HobbyModel>({
    hobbyType: {
      type: String,
    },
    hobby: {
      type: String,
    },
},{ timestamps: true });

export const HobbyModel = mongoose.model<HobbyModel>('Hobby', HobbySchema);
