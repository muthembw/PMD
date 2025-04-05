const mongoose = require("mongoose");

const productReferenceSchema = mongoose.Schema(
  {
    productId: {
      type: String,  // External product ID from the public API
      required: true,
      unique: true,  // Ensures no duplicate product IDs
    },
    productName: {
      type: String,
      required: true,  // This field could be marked required to ensure every product has a name
    },
    price: {
      type: Number,
      required: true,  // You could mark this field as required as well
    },
    imageUrl: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {  // Adding product description
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

const ProductReference = mongoose.model("ProductReference", productReferenceSchema);

module.exports = ProductReference;
