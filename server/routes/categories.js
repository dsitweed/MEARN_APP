import express from "express";
import { createCaterogy, deleteCaterogy, 
    getCaterogies, updateCaterogy } from "../controllers/category.js";

const router = express.Router();

router.get('/', getCaterogies);

router.post('/', createCaterogy);

router.put('/', updateCaterogy);

router.delete('/', deleteCaterogy);

export default router;