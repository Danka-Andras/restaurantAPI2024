const restaurantModel = require('../models/restaurantModel')

const getAllRestaurants = async (req, res, next) => {
    try {
        const ettermek = await restaurantModel.find()
        res.status(200).json(ettermek)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    getAllRestaurants
}