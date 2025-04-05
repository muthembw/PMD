const express = require('express');
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require('../controllers/OrderController');
const {protect} = require('../middleware/AuthMiddleware');

const router = express.Router();

router.route('/').get(getAllOrders).post(protect, createOrder);
router.route('/:id').get(getOrderById).put(protect, updateOrder).delete(protect, deleteOrder);

module.exports = router;
