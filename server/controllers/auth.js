import { UserModel } from "../models/User.js";
import bcrypt from 'bcrypt';

//REGISTER
export const register = async (req, res) => {
    try {
        const newUser = req.body;
        if(!newUser.username || !newUser.email || !newUser.password){
            res.status(500).json({mess:"Validation failed"});
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
            res.status(200).json(user);
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
