import jwt from "jsonwebtoken";
import { FAILED } from "../constants/index.js";

export const authenToken = (req, res, next) => {
    try {
        if (!req.cookies || !req.cookies.token){
            res.status(401).json({mess: FAILED});
            return;
        }
        const {token} = req.cookies;
        const secretStr = process.env.JWT_SECRET;

        const decode = jwt.verify(token, secretStr);
        if (decode) {
            req.userId = decode.identifyStr;
            next();
        }
    } catch (err) {
        console.log("error: ", err);
        res.status(500).json({mess: FAILED});
    }
}