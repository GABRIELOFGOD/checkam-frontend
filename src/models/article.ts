import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minLength: [3, "Title must be at least 3 characters long"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
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
});

// Update the updatedAt timestamp before saving
articleSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Article =
  mongoose.models.Article || mongoose.model("Article", articleSchema);

export default Article;
