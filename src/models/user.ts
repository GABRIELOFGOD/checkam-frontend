import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  fname: string;
  lname: string;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  role?: 'user' | 'admin' | 'legislator';
  password: string;
  constituency?: string;
  bio?: string;
  party?: string;
  socials?: {
    facebook?: string;
    linkedIn?: string;
    x?: string;
    mail?: string;
  }
}

const UserSchema: Schema<IUser> = new Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Date, default: null },
    image: { type: String, default: null },
    role: { type: String, enum: ['user', 'admin', 'legislator'], default: 'user' },
    password: { type: String, required: true },
    constituency: { type: String, default: "" },
    bio: { type: String, default: "" },
    party: { type: String, default: "" },
    socials: {
      facebook: { type: String, default: "" },
      linkedIn: { type: String, default: "" },
      x: { type: String, default: "" },
      mail: { type: String, default: "" },
    }
  },
  { timestamps: true }
);

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);