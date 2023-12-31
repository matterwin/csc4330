import mongoose  from 'mongoose';

type TokenModel = {
  token: string,
  isValid: boolean,
  user: mongoose.Types.ObjectId | undefined
};

const TokenSchema = new mongoose.Schema<TokenModel>({
  token: { 
      type: String, 
      required: true 
  },
  isValid: { 
      type: Boolean, 
      default: true 
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true }); 

export const TokenModel = mongoose.model<TokenModel>('Token', TokenSchema);