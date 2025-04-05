const Order = require('../models/orderModel');

// Create Order
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice, paymentMethod, orderStatus = "Pending" } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: "No order items selected" });
    }

    const order = new Order({
      createdBy: req.user._id, // Linking order to the logged-in user
      orderItems,
      shippingAddress,
      totalPrice,
      paymentMethod,
      orderStatus, // Default status is 'Pending' if not provided in the request body
    });

    await order.save(); // Save the order to DB
    res.status(201).json(order); // Return the created order
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};

// Fetch All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

// Fetch One Order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
};

// Update Order
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      // Authorization check: Ensure the user is the creator of the order
      if (order.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
      }

      // Update order fields with the provided body
      Object.assign(order, req.body);
      await order.save();
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
};

// Delete Order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      // Authorization check: Ensure the user is the creator of the order
      if (order.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
      }

      await order.deleteOne();
      res.json({ message: "Order deleted" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error: error.message });
  }
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };
