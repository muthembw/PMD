const express = require("express");
const { processPayment, getPaymentDetails } = require('../controllers/PaymentController');
const { protect } = require('../middleware/AuthMiddleware');

//console.log('processPayment:', processPayment);
//console.log('getPaymentDetails:', getPaymentDetails);
//console.log('protect:', protect);

const router = express.Router();

router.post("/", protect, processPayment); 
router.get("/:id", protect, getPaymentDetails); 

module.exports = router;
