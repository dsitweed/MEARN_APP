import { UserModel } from "../models/User.js";
import bcrypt from 'bcrypt';

//Nen han che tra ve password bang cach
//const {password, ...others} = user._doc;

//UPDATE
//'/:id' 
export const updateUser = async (req, res) => {
    try {
        console.log(req.body, req.params);
        if (req.body._id === req.params.id){
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
                
                const user = await UserModel.findOneAndUpdate({
                    _id: req.params.id},
                    req.body, {new:true});
                res.status(200).json(user);
            }
        }
        else{
            res.status(401).json({mess:"Can't update"});
        }
    }
    catch (err) {
        res.status(500).json({error: err});
    }
}
//DELETE
//'/:id' 
export const deleteUser = async (req, res) => {
    try {
        console.log(req.body, req.params);
        if (req.body.userId === req.params.id){
            const deleteId = req.body.userId || req.body._id;
            const user = await UserModel.findOneAndDelete({_id:deleteId});
            res.status(200).json(user);
        }
        else{
            res.status(401).json({mess:"Can't update"});
        }
    }
    catch (err) {
        res.status(500).json({error: err});
    }
}
//GET USER
//'/:id' 
export const getUser = async (req, res) => {
    try {
        const getId = req.params.id;
        const user = await UserModel.findOne({_id:getId});
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }
    catch (err) {
        res.status(500).json({error: err});
    }
}