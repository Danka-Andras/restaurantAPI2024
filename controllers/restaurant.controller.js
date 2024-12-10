const restaurantModel = require('../models/restaurantModel')

const getAllRestaurants = async (req, res, next) => {
    try {
        const ettermek = await restaurantModel.find()
        res.status(200).json(ettermek)
    } 
    catch (error) {
        if (error.message === 'Error 400'){ 
                res.status(400).json({ message: error.message }) 
            } 
        else{ res.status(500).json({ message: error.message }) }
    }
};

const createRestaurant = async(req, res, next) => {
    const ettermek = await restaurantModel.find()
}

module.exports = {
    getAllRestaurants,
    createRestaurant
}