import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  role?: 'user' | 'admin';
  password: string;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Date, default: null },
    image: { type: String, default: null },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);