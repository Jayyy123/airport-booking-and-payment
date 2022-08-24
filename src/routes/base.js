const { urlencoded } = require('express');
const express = require('express');
const router = express.Router();
const airportsController = require('../controllers/airportController');
const baseController = require('../controllers/baseController')

router.get('/', baseController.main)
router.get('/airports', airportsController.getAirports)

module.exports = router;