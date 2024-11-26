const restaurantController = require('../controllers/restaurant.controller')
const restaurantModel = require('../models/restaurantModel')

restaurantModel.find = jest.fn()

describe('A getAll végponthoz tartozó metódus tesztelése', ()=>{

    test('Létezik-e a getAllRestaurants függvény?', ()=>{
        expect(typeof restaurantController.getAllRestaurants).toBe('function')
    })

    test('A getAllRestaurants függvényben meg kellene hívni a model find() függvényét', ()=>{
        restaurantController.getAllRestaurants()
        expect(restaurantModel.find).toHaveBeenCalled()
    })
})
