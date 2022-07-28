import express from "express";
import { register, login, logout, getUserData } from "../controllers/auth.js";
import { authenToken } from "../middlewares/authenToken.js";
import { checkLogin } from "../middlewares/checkLogin.js";

const router = express.Router();

//REGISTER
router.post('/register', register);

// Co set 1 signed cookie: user_name
//LOGIN
router.post('/login', login);

//LOGOUT
router.get('/logout', authenToken ,logout);

//GET ALL USER
// router.get('/getuser', );

router.get('/checklogin', checkLogin);

router.get('/userdata', authenToken, getUserData);

export default router;