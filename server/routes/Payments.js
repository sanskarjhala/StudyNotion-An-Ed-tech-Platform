const express = require('express');
const router = express.Router();

const {capturepayment , verifyPayment, sendSuccessfullPaymentEmail} = require('../controllers/Payments');
const {auth , isAdmin ,isInstructor ,isStudent} = require('../middlewares/auth');

router.post("/capturePayment", auth, isStudent, capturepayment)
router.post("/verifyPayment",auth , isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendSuccessfullPaymentEmail);

module.exports = router