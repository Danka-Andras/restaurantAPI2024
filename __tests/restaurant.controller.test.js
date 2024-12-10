const httpMocks = require('node-mocks-http')
const restaurantController = require('../controllers/restaurant.controller')
const restaurantModel = require('../models/restaurantModel')
const restaurantlist = require('./mock-data/allRestaurants.json')

restaurantModel.find = jest.fn()
let req, res, next

beforeEach(()=>{
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = null
})

describe('A getAll végponthoz tartozó metódus tesztelése', ()=>{
    test('Létezik-e a getAllRestaurants függvény?', ()=>{
        expect(typeof restaurantController.getAllRestaurants).toBe('function')
    })
    test('A getAllRestaurants függvényben meg kellene hívni a model find() függvényét', ()=>{
        restaurantController.getAllRestaurants(req, res, next)
        expect(restaurantModel.find).toHaveBeenCalled()
    })
    test('A getAllRestaurant függvénynek vissza kellene adjon egy json listát az összes étteremmel és egy 200-as status kódot', async ()=>{
        restaurantModel.find.mockReturnValue(restaurantlist)
        await restaurantController.getAllRestaurants(req, res, next)
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBe(true)
        expect(res._getJSONData()).toStrictEqual(restaurantlist)
    })
    test('Hiba esetén 500-as kóddal kellene visszatérnie', async ()=>{
        const errorMessage = { message: 'Error 500' }
        restaurantModel.find.mockImplementation(() => Promise.reject(errorMessage))
        await restaurantController.getAllRestaurants(req, res, next)
        expect(res.statusCode).toBe(500)
        expect(res._isEndCalled()).toBe(true)
        expect(res._getJSONData()).toStrictEqual(errorMessage)
    })
    test('Felhasználói hiba esetén 400-as kóddal kell visszatérnie', async ()=>{
        const errorMessage = { message: 'Error 400' }
        restaurantModel.find.mockImplementation(() => Promise.reject(errorMessage))
        await restaurantController.getAllRestaurants(req, res, next)
        expect(res.statusCode).toBe(400)
        expect(res._isEndCalled()).toBe(true)
        expect(res._getJSONData()).toStrictEqual(errorMessage)
    })
    
})
