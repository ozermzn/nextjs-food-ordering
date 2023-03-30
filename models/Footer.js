import mongoose from "mongoose";

const FooterSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    icon: { type: [String] },
    link: { type: [String] },

    day: { type: String },
    hour: { type: String },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Footer || mongoose.model("Footer", FooterSchema);
