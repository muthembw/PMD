const express = require("express");
const { getProducts, getProductById } = require("../controllers/ProductController");

const router = express.Router();

router.get("/", getProducts);  // Fetch all products from the public API
router.get("/:id", getProductById);  // Fetch a single product by ID

module.exports = router;
