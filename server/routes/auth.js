import express from "express";
import { register, login } from "../controllers/auth.js";

const router = express.Router();

//REGISTER
router.post('/register', register);

//LOGIN
router.post('/login', login);
//GET ALL USER

router.get('/getuser', );


export default router;