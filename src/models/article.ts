import mongoose, { Schema, Model, Document } from "mongoose";
import { IUser } from "./user";

export interface IArticle extends Document {
  image?: string;
  title: string;
  content: string;
  author: IUser;
  status: "draft" | "published"
}

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    unique: true,
    minLength: [3, "Title must be at least 3 characters long"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    unique: true,
  },
  image: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "published",
  },
}, { timestamps: true });

// Update the updatedAt timestamp before saving
ArticleSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Article: Model<IArticle> =
  (mongoose.models.Article as Model<IArticle>) ||
  mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;
