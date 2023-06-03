const User = require("../models/user.model");
const { ObjectId } = require("mongodb");

exports.createOrUpdateUser = async (req, res) => {
  const name= req.body.name? req.body.name : req.user.email.split("@")[0]
  const { email } = req.user;
  const user = await User.findOneAndUpdate({ email }, {}, { new: true });
  if (user) {
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: name,
      role: req.body.userType
    }).save();
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};

exports.getUserDataById = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: new ObjectId(req.params.id),
    }).exec();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
