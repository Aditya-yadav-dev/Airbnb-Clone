 import express from "express";
import { login, logOut, signUp } from "../controller/Auth.controller.js";

 const Authrouter = express.Router()

 Authrouter.post('/signup',signUp);
 Authrouter.post('/login',login);
 Authrouter.get('/logout',logOut);

 export default Authrouter;
