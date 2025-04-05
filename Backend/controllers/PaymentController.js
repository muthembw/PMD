const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel.js");
const Order = require("../models/orderModel.js");


const processPayment = asyncHandler(async (req, res) => {
  const { orderId, paymentMethod, transactionId, amountPaid } = req.body;

  // Find the order
  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });  // Proper error response
  }

  // Create a new payment
  const payment = await Payment.create({
    user: req.user._id,
    order: orderId,
    paymentMethod,
    transactionId,
    amountPaid,
    paymentStatus: "Completed",  // Hardcoded as "Completed", you can modify based on your needs
    paidAt: Date.now(),
  });

  // Update order payment status
  order.isPaid = true;
  order.paidAt = Date.now();
  await order.save();

  // Return response
  res.status(201).json({ message: "Payment Successful", payment });
});

// @desc    Get Payment Details
// @route   GET /api/payments/:id
// @access  Private
const getPaymentDetails = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id).populate("user order");

  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });  // Proper error response
  }

  res.json(payment);  // Return payment details
});

module.exports = { processPayment, getPaymentDetails };
