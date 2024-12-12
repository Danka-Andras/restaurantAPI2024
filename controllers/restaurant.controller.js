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

const createRestaurant = async (req, res, next) => {
    try {
        const newRestaurant = new restaurantModel(req.body);
        const savedRestaurant = await newRestaurant.save(); 
        res.status(200).json(savedRestaurant); 
    } catch (error) {
        if (error.message === 'Error 400') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

const getRestaurantById = async (req, res, next) => {
    try {
        const restaurant = await restaurantModel.findById(req.params.id);
        res.status(200).json(restaurant);
    } catch (error) {
        if (error.message === 'Error 400') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};


const updateRestaurant = async (req, res, next) => {
    try {
        const updatedRestaurant = await restaurantModel.update(
            req.params.id,
            req.body,
            { new: true}
        );
        res.status(200).json(updatedRestaurant);
    } catch (error) {
        if (error.message === 'Error 400') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};


const deleteRestaurant = async (req, res, next) => {
    try {
        const deletedRestaurant = await restaurantModel.delete(req.params.id);
        res.status(200).json(deletedRestaurant);
    } catch (error) {
        if (error.message === 'Error 400') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};


module.exports = {
    getAllRestaurants,
    createRestaurant,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
}