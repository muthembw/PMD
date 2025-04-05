const axios = require("axios");
const ProductReference = require("../models/productModel");

// @desc    Fetch products from a public API
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const response = await axios.get('https://dummyjson.com/products');  // Public API URL
    const products = response.data.products; // Assuming 'data.products' contains the array of products

    // Use a loop that supports async/await
    for (const product of products) {
      await ProductReference.create({
        productId: product.id,
        productName: product.name,
        price: product.price,
        imageUrl: 'https://dummyjson.com/product-image.jpg',  // You may want to dynamically set this if needed
        category: product.category,
        description: product.description,  // Storing the description
      });
    }

    res.json(products);  // Return products with descriptions
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products from API" });
  }
};

// @desc    Fetch a single product by ID from the public API
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://dummyjson.com/products/${id}`);  // API endpoint for single product
    
    const product = response.data; 

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);  // Return product data including the description
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch product data" });
  }
};

module.exports = { getProducts, getProductById };  // Use CommonJS syntax
