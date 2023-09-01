import express, { Router } from 'express';

const spotRouter: Router = express.Router();

// add spot
spotRouter.post('/');

// update spot
spotRouter.put('/:id');

// delete spot
spotRouter.delete('/:id');

// get all spots
spotRouter.get('/');

// get a spot
spotRouter.get('/:id');

export default spotRouter;
