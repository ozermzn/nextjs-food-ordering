import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 60,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
