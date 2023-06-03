const mongoose = require("mongoose");

const VendorProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    vendorId: { type: String, required: true },
    vendorName: { type: String, required: true },
    imageUrl: { type: String },
    quantity: { type: Number, required: true },
  },
  { collection: "VendorProduct" },
  { timestamps: true }
);

const VendorProduct = mongoose.model("VendorProduct", VendorProductSchema);

module.exports = VendorProduct;
