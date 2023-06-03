const VendorProduct = require("../models/vendorProduct.model");
const UserProduct = require("../models/userProduct.model");
const User = require("../models/user.model");
const { ObjectId } = require("mongodb");

exports.products = (req, res) => {
  res.send(productList);
};

exports.addVendorProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      vendorId,
      vendorName,
      imageUrl,
      quantity,
    } = req.body;

    const product = new VendorProduct({
      title,
      description,
      price,
      vendorId,
      vendorName,
      imageUrl,
      quantity,
    });

    await product.save();

    const user = await User.findOne({
      _id: new ObjectId(product.vendorId),
    }).exec();
    user.products = [...user.products, product._id];
    await user.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.addUserProduct = async (req, res) => {
  try {
    const { title, description, price, userId, serialNo, imageUrl, quantity } =
      req.body;
    const product = new UserProduct({
      title,
      description,
      price,
      userId,
      serialNo,
      imageUrl,
      quantity,
    });

    await product.save();

    const user = await User.findOne({
      _id: userId,
    }).exec();
    user.products = [...user.products, product._id];
    user.rewardsPoint = user.rewardsPoint
      ? user.rewardsPoint
      : 0 + price * quantity;
    await user.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProductsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      _id: new ObjectId(userId),
    }).exec();
    if (user !== null) {
      const products = await (user.role === "subscriber"
        ? UserProduct
        : VendorProduct
      ).find({
        _id: {
          $in: user.products.map((id) => new ObjectId(id)),
        },
      });
      res.status(201).json(products);
    }
    res.status(404).json({ message: "user not found" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const products = await VendorProduct.find({}).skip(skip).limit(limit);
    res.status(201).json(products);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
