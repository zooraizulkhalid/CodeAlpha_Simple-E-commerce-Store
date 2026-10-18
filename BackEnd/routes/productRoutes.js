
const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().lean();

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
});

// GET a single product by its existing ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({
      id: req.params.id,
    }).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
});

module.exports = router;
