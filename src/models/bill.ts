import mongoose, { Schema, Document, Model } from "mongoose";

export enum Category {
  DEVELOPMENT = "development",
  HEALTH = "health",
  EDUCATION = "education",
}

export enum BillStage {
  FIRST_READING = "first-reading",
  SECOND_READING = "second-reading",
  PASSED = "passed",
}

export interface IBill extends Document {
  image?: string;
  title: string;
  summary: string;
  file: string;
  category: Category;
  stage: BillStage;
}

const BillSchema: Schema<IBill> = new Schema(
  {
    image: { type: String },
    title: { type: String, required: true },
    summary: { type: String },
    file: { type: String, required: true },
    category: {
      type: String,
      enum: Object.values(Category),
      required: true,
    },
    stage: {
      type: String,
      enum: Object.values(BillStage),
      required: true,
    },
  },
  { timestamps: true }
);

const Bill: Model<IBill> = mongoose.models.Bill || mongoose.model<IBill>("Bill", BillSchema);

export default Bill;
