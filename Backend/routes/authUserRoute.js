const express =require('express');
const{registerUser, loginUser, getUserProfile} = require('../controllers/UserController');
const {protect}= require('../middleware/AuthMiddleware');

const router =express.Router();

//console.log("registerUser:", typeof registerUser);
//console.log("loginUser:", typeof loginUser);
//console.log("getUserProfile:", typeof getUserProfile);
//console.log("protect:", typeof protect); 



router.post("/register", registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;