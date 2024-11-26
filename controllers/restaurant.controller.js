const restaurantModel = require('../models/restaurantModel')

const getAllRestaurants = ()=>{
    const ettermek = restaurantModel.find()
}

module.exports = {
    getAllRestaurants
}