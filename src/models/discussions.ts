import mongoose, { Document, Schema, Model } from "mongoose";
import { IUser } from "./user";
// import { DiscussionComment } from "@/types/discussion";
import { IConstituency } from "./constituency";
import { DiscussionComment } from "@/types/discussion";

export interface IDiscussionType extends Document {
  postedBy: IUser;
  content: string;
  likes: IUser[];
  comments: DiscussionComment[];
  constituencies: IConstituency[];
  images: string[];
  tags: IUser[];
  notableComments: IUser[];
}

const DiscussionSchema = new Schema({
  postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },

  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],

  tags: [{ type: Schema.Types.ObjectId, ref: "User" }],
  notableComments: [{ type: Schema.Types.ObjectId, ref: "User" }],
  constituencies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Constituency"
  }],
  images: [String],
}, { timestamps: true });


const Discussion: Model<IDiscussionType> = (mongoose.models.Discussion as Model<IDiscussionType>) || mongoose.model<IDiscussionType>("Discussion", DiscussionSchema);

export default Discussion;