import mongoose, { Schema, Document } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    whatsapp: {
      type: String,
      required: true,
    },
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

// Create a Mongoose model based on the schema
export interface UserModel extends Document {
  email: string;
  name: string;
  password: string;
  contact?: {
    whatsapp?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export const User = mongoose.model<UserModel>('User', userSchema);
