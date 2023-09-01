import express, { Router } from 'express';

const restaurantRouter: Router = express.Router();

// add restaurant
restaurantRouter.post('/');

// update restaurant
restaurantRouter.put('/:id');

// delete restaurant
restaurantRouter.delete('/:id');

// get all restaurants
restaurantRouter.get('/');

// get a restaurant
restaurantRouter.get('/:id');

export default restaurantRouter;
