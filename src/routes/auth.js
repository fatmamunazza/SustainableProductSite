const express = require("express");
const { products } = require("../controllers/productController");

const router = express.Router();

const { authCheck, vendorCheck } = require("../middlewares/auth");

const {
  createOrUpdateUser,
  currentUser,
  getUserDataById,
} = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-vendor", authCheck, vendorCheck, currentUser);
router.get("/getUserDataById/:id", getUserDataById);

module.exports = router;
