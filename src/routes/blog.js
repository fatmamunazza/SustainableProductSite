const express = require("express");
const {
  addBlog,
  getBlogsByAuthorId,
  getAllBlogs,
  getBlogById,
} = require("../controllers/blogController");

const { authCheck, vendorCheck } = require("../middlewares/auth");
const router = express.Router();

router.post("/blogs/addBlog", addBlog);
router.get("/blogs/getBlog/:id", getBlogById);
router.get("/blogs/getBlogs/:id", getBlogsByAuthorId);
router.get("/blogs/getAllBlogs", getAllBlogs);

module.exports = router;
