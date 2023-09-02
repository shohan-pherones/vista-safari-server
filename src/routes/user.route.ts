import express, { Router } from 'express';
import UserController from '../controllers/user.controller';

const userRouter: Router = express.Router();

const userInstance = new UserController();

// register user
userRouter.post('/register', userInstance.register);

// login user
userRouter.post('/login', userInstance.login);

// get all users
userRouter.get('/');

// get an user
userRouter.get('/:id');

// update an user
userRouter.put('/:id');

// delete an user
userRouter.delete('/:id');

export default userRouter;
