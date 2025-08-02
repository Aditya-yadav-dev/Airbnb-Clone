
import express from 'express'
import { getcurrentuser } from '../controller/user.controller.js';
import isAuth from '../middleware/isAuth.js';

const userRouter = express.Router();

userRouter.get('/getcurrentuser',isAuth,getcurrentuser)

export default userRouter;