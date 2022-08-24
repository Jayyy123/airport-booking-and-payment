const { urlencoded } = require('express');
const express = require('express');
const router = express.Router();
const airportsController = require('../controllers/airportController');
const baseController = require('../controllers/baseController');
const paymentController = require('../controllers/paymentController');

router.get('/', baseController.main)
router.get('/airports', airportsController.getAirports)
router.get('/pay', paymentController.getPayments)
router.post('/pay', paymentController.makePayment)

module.exports = router;
