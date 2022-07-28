import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";
import { FAILED, SUCCESS } from "../constants/index.js";
import { SessionModel } from "../models/Session.js";

// return boolean
export const checkLogin = async (req, res) => {
  try {
    if (!req.cookies) {
      res.status(401).json({ message: FAILED });
      return false;
    }
    const { token } = req.cookies;
    if (!token) {
      console.log("don't have token!");
      res.status(401).json({ message: FAILED });
      return false;
    }

    const secretStr = process.env.JWT_SECRET;
    // verify neu token da het han roi thi sao
    const decode = jwt.verify(token, secretStr);
    const { identifyStr } = decode;
    const user = await SessionModel.findOne({ identifyStr : identifyStr });
    if (!user) {
      res.status(401).json({ message: FAILED });
      return false;
    }
    res.status(200).json({ message: SUCCESS });
    return true;
  } catch (err) {
    console.log("err:", err);
    res.status(401).json({message: FAILED});
  }
};
