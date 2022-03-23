import { UserModel } from "../models/User.js";
import bcrypt from 'bcrypt';

//REGISTER
export const register = async (req, res) => {
    try {
        const newUser = req.body;
        if(!newUser.username || !newUser.email || !newUser.password){
            res.status(401).json({mess:"Validation failed"});
            return;
        }
        const checkEmail = await isEmail(newUser.email)
        if (checkEmail === true) {
            res.status(401).json({mess:"Validation failed"});
            return;
        }
        const check = await isHaveUser(newUser.username,"");
        //Chua catch exits email
        if (check === false) {
            const saltRounds = 10;
            const myPlaintextPassword = newUser.password;

            bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
                newUser.password = hash;
                const user = new UserModel(newUser);
                await user.save();
                res.status(200).json(user);
            });
        }
        else{
            res.status(401).json({mess:'failed'});
        }
    }
    catch(err){
        res.status(500).json({error: err});
        console.log("err:", err);
    }
};
//LOGIN
export const login = async (req, res) => {
    try {
        const user = req.body;
        const check = await isHaveUser(user.username, user.password);
        if(check === true){
            const getUser = await UserModel.findOne({username: user.username});
            const userData = getUser._doc;
            res.status(200)
                .cookie('user_id',userData._id, {signed: true})
                .json(userData);
        }
        else{
            res.status(400).json({mess:"Failed"});
        }
    }
    catch (err) {
        console.log("err", err);
        res.status(500).json({error: err});
    }
}
//LOGOUT
export const logout = async (req, res) => {
    try {
        res.status(200)
            .clearCookie('user_id', {signed:true})
            .json({mess:"Logout"});
    }
    catch (err) {
        console.log("err", err);
        res.status(500).json({error: err});
    }
}

// return boolen
async function isHaveUser(username, password){
    var check = false;
    var user = {};
    if (!username) return false;
    //Catch exist user
    await UserModel.findOne({username: username})
        .then((data) => {
            if (data !== null) check = true;
            user = data;
            console.log("isHaveUser data:", data);
        });
    if (!password) return check;
    return (bcrypt.compareSync(password, user.password));
}

async function isEmail(email){
    var check = false;
    await UserModel.findOne({email: email})
        .then(data => {
            if (data !== null) check = true;
        });
    return check;
}
