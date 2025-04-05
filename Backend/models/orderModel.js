const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User Model (who placed the order)
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Reference to Product Model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        }, // Price at the time of order
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0, // Default value for total price
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending", // Default to "Pending"
    },
    isPaid: {
      type: Boolean,
      default: false, // Default to false until payment is confirmed
    },
    paidAt: {
      type: Date, // Stores the date when the order was paid
    },
    isDelivered: {
      type: Boolean,
      default: false, // Default to false until delivered
    },
    deliveredAt: {
      type: Date, // Stores the date when the order was delivered
    },
    shippingAddress: {
      address: { type: String, required: true }, // Full shipping address
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Calculate the total price before saving
orderSchema.pre("save", function (next) {
  if (this.orderItems && this.orderItems.length > 0) {
    this.totalPrice = this.orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
