import { BillCategories } from "@/data/category";
import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./user";

export enum BillStage {
  PROPOSED = "proposed",
  PASSED = "passed",
  REJECTED = "rejeected"
}

// export const BillCategories = [
//   { id: 1, name: "Infrastructure & Urban Development" },
//   { id: 2, name: "Health & Public Safety" },
//   { id: 3, name: "Education & Skills Development" },
//   { id: 4, name: "Youth & Sports" },
//   { id: 5, name: "Climate Change, Environment & Agriculture" },
//   { id: 6, name: "Social Welfare & Inclusion" },
//   { id: 7, name: "Economy, Trade & Investment" },
//   { id: 8, name: "Governance, Law & Justice" },
//   { id: 9, name: "Energy & Utilities" }
// ];

export type Category = typeof BillCategories[number]["name"];

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
      enum: Object.values(BillStage),
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
