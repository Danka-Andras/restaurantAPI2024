const httpMocks = require('node-mocks-http')
const restaurantController = require('../controllers/restaurant.controller')
const restaurantModel = require('../models/restaurantModel')
const restaurantlist = require('./mock-data/allRestaurants.json')

let req, res, next

beforeEach(() => { 
    req = httpMocks.createRequest(); 
    res = httpMocks.createResponse(); 
    next = null; 
    restaurantModel.prototype.save = jest.fn().mockResolvedValue(req.body); 
    restaurantModel.find = jest.fn().mockResolvedValue(restaurantlist); 
    restaurantModel.findById = jest.fn().mockResolvedValue(req.params.id)
    restaurantModel.update = jest.fn().mockResolvedValue(req.body);
    restaurantModel.delete = jest.fn().mockResolvedValue(req.params.id)
});

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
})

describe('A createRestaurant végponthoz tartozó metódus tesztelése', ()=>{
    test('Létezik-e a createRestaurant függvény?', ()=>{
        expect(typeof restaurantController.createRestaurant).toBe('function')
    })
    test('A createRestaurant függvényben meg kellene hívni a model save() függvényét', ()=>{
        restaurantController.createRestaurant(req, res, next)
        expect(restaurantModel.prototype.save).toHaveBeenCalled()
    })
    test('200-as válasz kódot ad vissza sikeres mentés esetén', async () => { 
        await restaurantController.createRestaurant(req, res, next); 
        expect(res.statusCode).toBe(200); 
        expect(res._getJSONData()).toEqual(req.body); 
    });
    test('Hiba esetén 500-as kóddal kellene visszatérnie', async ()=>{
        const errorMessage = { message: 'Error 500' }
        restaurantModel.prototype.save.mockImplementation(() => Promise.reject(errorMessage))
        await restaurantController.createRestaurant(req, res, next)
        expect(res.statusCode).toBe(500)
        expect(res._isEndCalled()).toBe(true)
        expect(res._getJSONData()).toStrictEqual(errorMessage)
    })
    test('Felhasználói hiba esetén 400-as kóddal kell visszatérnie', async ()=>{
        const errorMessage = { message: 'Error 400' }
        restaurantModel.prototype.save.mockImplementation(() => Promise.reject(errorMessage))
        await restaurantController.createRestaurant(req, res, next)
        expect(res.statusCode).toBe(400)
        expect(res._isEndCalled()).toBe(true)
        expect(res._getJSONData()).toStrictEqual(errorMessage)
    })
})

describe('A getRestaurantById végponthoz tartozó metódus tesztelése', ()=>{
    test('Létezik-e a getRestaurantById függvény?', ()=>{
        expect(typeof restaurantController.getRestaurantById).toBe('function')
    })
    test('A getRestaurantById függvényben meg kellene hívni a model findById() függvényét', ()=>{
        restaurantController.getRestaurantById(req, res, next)
        expect(restaurantModel.findById).toHaveBeenCalled()
    })
    test('200-as válasz kódot ad vissza sikeres találat esetén', async () => { 
        await restaurantController.getRestaurantById(req, res, next); 
        expect(res.statusCode).toBe(200);
    });
    test('Hiba esetén 500-as kóddal kellene visszatérnie', async ()=>{
        const errorMessage = { message: 'Error 500' }
        restaurantModel.findById.mockImplementation(() => Promise.reject(errorMessage))
        await restaurantController.getRestaurantById(req, res, next)
        expect(res.statusCode).toBe(500)
        expect(res._isEndCalled()).toBe(true)
        expect(res._getJSONData()).toStrictEqual(errorMessage)
    })
    test('Felhasználói hiba esetén 400-as kóddal kell visszatérnie', async ()=>{
        const errorMessage = { message: 'Error 400' }
        restaurantModel.findById.mockImplementation(() => Promise.reject(errorMessage))
        await restaurantController.getRestaurantById(req, res, next)
        expect(res.statusCode).toBe(400)
        expect(res._isEndCalled()).toBe(true)
        expect(res._getJSONData()).toStrictEqual(errorMessage)
    })
})

describe('Az updateRestaurant végponthoz tartozó metódus tesztelése', ()=>{
    test('Létezik-e az updateRestaurant függvény?', ()=>{
        expect(typeof restaurantController.updateRestaurant).toBe('function')
    })
    test('Az updateRestaurant függvényben meg kellene hívni a model update() függvényét', ()=>{
        restaurantController.updateRestaurant(req, res, next)
        expect(restaurantModel.update).toHaveBeenCalled()
    })
    test('200-as válasz kódot ad vissza sikeres frissités esetén', async () => { 
        await restaurantController.updateRestaurant(req, res, next); 
        expect(res.statusCode).toBe(200);
    });
    test('Hiba esetén 500-as kóddal kellene visszatérnie', async ()=>{
        const errorMessage = { message: 'Error 500' }
        restaurantModel.update.mockImplementation(() => Promise.reject(errorMessage))
        await restaurantController.updateRestaurant(req, res, next)
        expect(res.statusCode).toBe(500)
        expect(res._isEndCalled()).toBe(true)
        expect(res._getJSONData()).toStrictEqual(errorMessage)
    })
    test('Felhasználói hiba esetén 400-as kóddal kell visszatérnie', async ()=>{
        const errorMessage = { message: 'Error 400' }
        restaurantModel.update.mockImplementation(() => Promise.reject(errorMessage))
        await restaurantController.updateRestaurant(req, res, next)
        expect(res.statusCode).toBe(400)
        expect(res._isEndCalled()).toBe(true)
        expect(res._getJSONData()).toStrictEqual(errorMessage)
    })
})

describe('A deleteRestaurant végponthoz tartozó metódus tesztelése', ()=>{
    test('Létezik-e a deleteRestaurant függvény?', ()=>{
        expect(typeof restaurantController.deleteRestaurant).toBe('function')
    })
    test('A deleteRestaurant függvényben meg kellene hívni a model delete() függvényét', ()=>{
        restaurantController.deleteRestaurant(req, res, next)
        expect(restaurantModel.delete).toHaveBeenCalled()
    })
    test('200-as válasz kódot ad vissza sikeres törlés esetén', async () => { 
        await restaurantController.deleteRestaurant(req, res, next); 
        expect(res.statusCode).toBe(200);
    });
    test('Hiba esetén 500-as kóddal kellene visszatérnie', async ()=>{
        const errorMessage = { message: 'Error 500' }
        restaurantModel.delete.mockImplementation(() => Promise.reject(errorMessage))
        await restaurantController.deleteRestaurant(req, res, next)
        expect(res.statusCode).toBe(500)
        expect(res._isEndCalled()).toBe(true)
        expect(res._getJSONData()).toStrictEqual(errorMessage)
    })
    test('Felhasználói hiba esetén 400-as kóddal kell visszatérnie', async ()=>{
        const errorMessage = { message: 'Error 400' }
        restaurantModel.delete.mockImplementation(() => Promise.reject(errorMessage))
        await restaurantController.deleteRestaurant(req, res, next)
        expect(res.statusCode).toBe(400)
        expect(res._isEndCalled()).toBe(true)
        expect(res._getJSONData()).toStrictEqual(errorMessage)
    })

})
