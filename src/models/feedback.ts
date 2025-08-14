// import mongoose, { Schema, Document, Model } from 'mongoose';
// import { IUser } from './user';

// interface IFeedback extends Document {
//   about: string;
//   urgency: string;
//   feedback: string;
//   user: IUser
// }

// const FeedbackSchema: Schema<IFeedback> = new Schema({
//   about: { type: String, required: true },
//   urgency: { type: String, required: true },
//   feedback: { type: String, required: true },
//   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// }, { timestamps: true });

// export const Feedback: Model<IFeedback> = mongoose.model('Feedback', FeedbackSchema);


import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./user";

interface IFeedback extends Document {
  about: string;
  urgency: string;
  feedback: string;
  user: IUser;
  status?: string;
}

const FeedbackSchema: Schema<IFeedback> = new Schema(
  {
    about: { type: String, required: true },
    urgency: { type: String, required: true },
    feedback: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const Feedback: Model<IFeedback> =
  mongoose.models.Feedback || mongoose.model<IFeedback>("Feedback", FeedbackSchema);
