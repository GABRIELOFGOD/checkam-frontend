import { BillCategories, billStages } from "@/data/category";
import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./user";

export type Category = typeof BillCategories[number]["name"];
export type BillStage = typeof billStages[number]["name"];

export interface IBill extends Document {
  image?: string;
  title: string;
  summary: string;
  file: string;
  category: Category;
  stage: BillStage;
  sponsored: IUser;
}

const BillSchema: Schema<IBill> = new Schema(
  {
    image: { type: String },
    title: { type: String, required: true },
    summary: { type: String },
    file: { type: String, required: true },
    category: {
      type: String,
      enum: BillCategories.map(c => c.name),
      required: true,
    },
    stage: {
      type: String,
      enum: billStages.map(s => s.name),
      required: true,
    },
    sponsored: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: async function (userId: mongoose.Types.ObjectId) {
          const User = mongoose.model("User");
          const user = await User.findById(userId);
          return user && user.role === "legislator";
        },
        message: "Only legislator can Sponsor a Bill",
      },
    },
  },
  { timestamps: true }
);

export const Bill: Model<IBill> = mongoose.models.Bill || mongoose.model<IBill>("Bill", BillSchema);
