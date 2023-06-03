const express = require("express");
const {
  addProductsInCart,
  getAllProductsByUserId,
} = require("../controllers/cartController");

const { authCheck, vendorCheck } = require("../middlewares/auth");
const router = express.Router();

router.post("/cart/addProducts", addProductsInCart);
router.get("/cart/getAllProductsByUserId/:id", getAllProductsByUserId);

module.exports = router;
