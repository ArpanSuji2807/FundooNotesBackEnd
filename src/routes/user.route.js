import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAutherization } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userController.getAllUsers);

//route to create a new user
router.post('/signUp', newUserValidator, userController.UserRegistration);

//route to get a single user by their user id
router.post('/login', userController.userLogin);

//route for forget password
router.post('/forgetPassword',userController.forgetPassword);

//route to update password
router.post('/resetpassword/:token',userAutherization,userController.resetPassword);

export default router;