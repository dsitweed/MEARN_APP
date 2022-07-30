import express from "express";
import jwt from "jsonwebtoken";
import { verify } from "../config/googleLogin.js";
import { FAILED, SUCCESS } from "../constants/index.js";
import { isHaveEmail, isHaveUser } from "../controllers/auth.js";
import { SessionModel } from "../models/Session.js";
import { UserModel } from "../models/User.js";

const router = express.Router();

// auth login for google
router.post("/login", async (req, res) => {
  let userId;
  let user = null;
  try {
    console.log("Du lieu gui len: ", req.body);
    // token google response
    const token = req.body.credential || req.body.code;
    user = await verify(token);
    if (!user || !(user.email)) {
      res.status(401).json({message: FAILED});
      return;
    }
    const check = await isHaveEmail(user.email);
    console.log("result: ", check);
    // Don't exist user => create new user
    if (user && !check) {
      const newUser = new UserModel({
        username: user.displayName,
        email : user.email,
        password : null,
        profilePic: "",
      });
      await newUser.save(); // save to database
      userId = String (newUser._id);
    }
    // Exist user 
    if (user && check) {
      user = await UserModel.findOne({email: user.email});
      userId = String (user._id);
    }
    // Create jwt token => add to cookie
    const secretStr = process.env.JWT_SECRET;
    const signinToken = jwt.sign({
      identifyStr: userId
    }, secretStr, {expiresIn: "1h"});
    
    const session = SessionModel.findOne({identifyStr : userId});
    if (!session) {
      // create new session
      const newSession = new SessionModel({
        identifyStr : userId
      });
      await newSession.save();
  
      setTimeout( async() => {
        const deleteSesion = await SessionModel.deleteOne({
          identifyStr : userId
        })
      }, 1000 * 60 * 60); // milliseconds
    }
    

    console.log("--------", userId);
    res.status(200)
      .cookie("token", signinToken)
      .json({
        _id: userId,
        username: user.displayName || user.username,
        email : user.email,
        profilePic: user.profilePic || "",
      })
  } catch (error) {
    console.log(error);
    res.send({ message: FAILED });
  }
});

export default router;