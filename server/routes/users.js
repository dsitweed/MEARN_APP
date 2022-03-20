import express from "express";
import { deleteUser, getUser, updateUser } from "../controllers/user.js";

const router = express.Router();

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.get('/:id', getUser);

export default router;
