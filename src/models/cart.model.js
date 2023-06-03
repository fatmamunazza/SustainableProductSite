const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        vendorId: { type: String, required: true },
        vendorName: { type: String, required: true },
        imageUrl: { type: String, required: true },
        quantity: { type: Number, required: true },
        productQuantityInCart: { type: String },
        _id: false,
      },
    ],
    userId: { type: String, required: true },
  },
  { collection: "Cart" },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
