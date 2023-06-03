const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    products: [{ type: String }],
    blogs: [{ type: String }],
    cart: { type: String },
    rewardsPoint: { type: Number },
  },
  { collection: "User" },
  { timestamps: true }
);

const model = mongoose.model("User", User);

module.exports = model;
