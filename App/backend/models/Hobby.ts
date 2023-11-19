import mongoose from 'mongoose';

type HobbyModel = {
  hobbyType: string,
  hobbies: string[];
};

const HobbySchema = new mongoose.Schema<HobbyModel>({
    hobbyType: {
      type: String,
    },
    hobbies: {
      type: [String],
    },
},{ timestamps: true });

export const HobbyModel = mongoose.model<HobbyModel>('Hobby', HobbySchema);
