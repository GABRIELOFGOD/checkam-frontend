import mongoose, { Document, Model, Schema } from "mongoose";

export interface IConstituency extends Document  {
  name: string;
}

const ConstituencySchema: Schema<IConstituency> = new Schema({
  name: {
    type: String,
    required: [true, "Constituency must have a name"],
    unique: [true, "This constituency has been created"]
  }
}, { timestamps: true });

const Constituency: Model<IConstituency> = (mongoose.models.Constituency as Model<IConstituency>) || mongoose.model<IConstituency>("Constituency", ConstituencySchema);

export default Constituency;