const mongoose = require("mongoose");

const UserProduct = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
    serialNo: { type: String, required: true },
    imageUrl: { type: String },
    quantity: { type: Number },
  },
  { collection: "UserProduct" },
  { timestamps: true }
);

const model = mongoose.model("UserProduct", UserProduct);

module.exports = model;
