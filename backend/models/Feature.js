import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema(
  {
    image: String,
  },
  { timestamps: true }
);

const Feature = mongoose.model("Feature", FeatureSchema);
export default Feature;
