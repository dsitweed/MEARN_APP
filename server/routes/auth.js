import express from "express";
import { register, login, logout } from "../controllers/auth.js";

const router = express.Router();

//REGISTER
router.post('/register', register);

// Co set 1 signed cookie: user_name
//LOGIN
router.post('/login', login);

//LOGOUT
router.get('/logout', logout);

//GET ALL USER
// router.get('/getuser', );


export default router;