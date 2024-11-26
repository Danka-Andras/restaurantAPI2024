const express = require('express')
const getAllRestaurants = require('../controllers/restaurant.controller')

const router = express.Router()

router.get('/', getAllRestaurants)

module.exports = router