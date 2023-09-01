import express, { Router } from 'express';

const resortRouter: Router = express.Router();

// add resort
resortRouter.post('/');

// update resort
resortRouter.put('/:id');

// delete resort
resortRouter.delete('/:id');

// get all resorts
resortRouter.get('/');

// get a resort
resortRouter.get('/:id');

export default resortRouter;
