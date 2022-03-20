import express from "express";
import { createCaterogy, getCaterogies } from "../controllers/category.js";

const router = express.Router();

router.get('/', getCaterogies);

router.post('/', createCaterogy);

export default router;