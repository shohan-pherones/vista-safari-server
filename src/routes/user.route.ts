import express, { Router } from 'express';

const userRouter: Router = express.Router();

// register user
userRouter.post('/register');

// login user
userRouter.post('/login');

// get all users
userRouter.get('/');

// get an user
userRouter.get('/:id');

// update an user
userRouter.put('/:id');

// delete an user
userRouter.delete('/:id');

export default userRouter;
