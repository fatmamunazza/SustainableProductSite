const express = require("express");
const {
  products,
  addVendorProduct,
  addUserProduct,
  getProductsByUserId,
  getAllProducts,
} = require("../controllers/productController");

const { authCheck, vendorCheck } = require("../middlewares/auth");
const router = express.Router();

router.get("/products", authCheck, products);
router.post("/products/addVendorProduct", addVendorProduct);
router.post("/products/addUserProduct", addUserProduct);
router.get("/products/getProducts/:id", getProductsByUserId);
router.get("/products/getAllProducts", getAllProducts);

module.exports = router;
