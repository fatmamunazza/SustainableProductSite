const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subheading: { type: String },
    description: { type: String, required: true },
    videoUrl: { type: String },
    imgUrls: [{ type: String }],
    author: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId },
  },
  { collection: "Blog" },
  { timestamps: true }
);

const model = mongoose.model("Blog", Blog);

module.exports = model;
