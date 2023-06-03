const Blog = require("../models/blog.model");
const User = require("../models/user.model");
const { ObjectId } = require("mongodb");

exports.addBlog = async (req, res) => {
  try {
    const {
      title,
      subheading,
      description,
      videoUrl,
      imgUrls,
      author,
      authorId,
    } = req.body;

    const blog = new Blog({
      title,
      subheading,
      description,
      videoUrl,
      imgUrls,
      author,
      authorId,
    });

    await blog.save();

    const user = await User.findOne({
      _id: new ObjectId(blog.authorId),
    }).exec();
    user.blogs = [...user.blogs, blog._id];
    await user.save();

    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getBlogsByAuthorId = async (req, res) => {
  try {
    const authorId = req.params.id;
    const user = await User.findOne({
      _id: new ObjectId(authorId),
    }).exec();

    const blogs = await Blog.find({
      _id: { $in: user.blogs.map((id) => new ObjectId(id)) },
    });
    res.status(201).json(blogs);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const blogs = await Blog.find({}).skip(skip).limit(limit);
    res.status(201).json(blogs);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findOne({
      _id: new ObjectId(blogId),
    }).exec();

    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
