const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const { ObjectId } = require("mongodb");

exports.addProductsInCart = async (req, res) => {
  try {
    const userId = req.query.userId;
    const quantity = parseInt(req.query.quantity);

    const productDetails = req.body;
    const user = await User.findOne({
      _id: new ObjectId(userId),
    }).exec();
    let cart;

    if (user.cart) {
      cart = await Cart.findOne({
        _id: new ObjectId(user.cart),
      }).exec();
      cart.products = cart.products.filter(
        (product) => product.productId !== productDetails.productId
      );
      cart.products = [
        ...cart.products,
        { ...productDetails, productQuantityInCart: quantity },
      ];
    } else {
      cart = new Cart({
        products: [{ ...productDetails, productQuantityInCart: quantity }],
        userId,
      });
    }
    await cart.save();
    if (!user.cart) {
      user.cart = cart._id;
      await user.save();
    }

    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllProductsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      _id: new ObjectId(userId),
    }).exec();
    if (user) {
      if (user.cart) {
        const cart = await Cart.findOne({
          _id: new ObjectId(user.cart),
        }).exec();
        res.status(201).json(cart.products);
      } else {
        res
          .status(404)
          .json({ message: "no products have been added in the cart" });
      }
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
