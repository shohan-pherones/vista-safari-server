import express, { Router } from 'express';
import UserController from '../controllers/user.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const userRouter: Router = express.Router();

const userInstance = new UserController();
const authMiddleware = new AuthMiddleware();

// register user
userRouter.post('/register', userInstance.register);

// login user
userRouter.post('/login', userInstance.login);

// get an user
userRouter.get('/:id', authMiddleware.verifyUser, userInstance.getAnUser);

// update an user
userRouter.put('/:id', authMiddleware.verifyUser, userInstance.updateAnUser);

// delete an user
userRouter.delete('/:id', authMiddleware.verifyUser, userInstance.deleteAnUser);

// get all users
userRouter.get(
  '/',
  authMiddleware.verifyUser,
  authMiddleware.checkAdminRole,
  userInstance.getAllUsers
);

export default userRouter;
