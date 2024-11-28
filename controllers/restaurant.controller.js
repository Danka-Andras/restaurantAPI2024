const restaurantModel = require('../models/restaurantModel')

const getAllRestaurants = async(req, res, next)=>{
    const ettermek = await restaurantModel.find()
    res.status(200).json(ettermek)
}

module.exports = {
    getAllRestaurants
}