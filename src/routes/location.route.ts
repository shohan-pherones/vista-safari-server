import express, { Router } from 'express';

const locationRouter: Router = express.Router();

// add location
locationRouter.post('/');

// update location
locationRouter.put('/:id');

// delete location
locationRouter.delete('/:id');

// get all locations
locationRouter.get('/');

// get a location
locationRouter.get('/:id');

export default locationRouter;
