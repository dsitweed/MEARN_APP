import { CategoryModel } from "../models/Category.js";

//Chua hop li lam
export const createCaterogy = async (req, res) => {
    try{
        const newCat = new CategoryModel(req.body);
        const saveCat = await newCat.save();
        res.status(200).json(saveCat);
    }
    catch (err){
        res.status(200).json({mess:err});
    }
}

//get all
export const getCaterogies = async (req, res) => {
    try{
        const cats = await CategoryModel.find();
        res.status(200).json(cats);
    }
    catch (err){
        res.status(500).json({mess:err});
    }
}