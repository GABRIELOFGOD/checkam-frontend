// models/comment.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment extends Document {
  discussion: mongoose.Types.ObjectId;
  parent: mongoose.Types.ObjectId | null;
  by: mongoose.Types.ObjectId;
  message: string;
  likes: mongoose.Types.ObjectId[];
}

const CommentSchema = new Schema<IComment>({
  discussion: {
    type: Schema.Types.ObjectId,
    ref: "Discussion",
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    default: null, // null → top level
  },
  by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
}, { timestamps: true });

const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
