import  jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";
import { Error } from "mongoose";


const protect = asyncHandler(async(req,res,next)=>{
    

const{accessToken,refreshToken} = req.cookies
   
    if (!accessToken) {
        if(!refreshToken) {
            return res.json({valid: false, message: "No Refresh token"})
        } else {
            jwt.verify(refreshToken,process.env.JWT_SECRET_REFRESH , async(err ,decoded) => {
                if(err) {
                    return res.json({valid: false, message: "Invalid Refresh Token"})
                } else {
                    const accessToken = jwt.sign({userId: decoded.userId}, 
                        process.env.JWT_SECRET_ACCESS , {expiresIn: '1m'})
                    res.cookie('accessToken', accessToken, {maxAge: 60000})
                    req.user = await User.findById(decoded.userId).select('-password')
                    next()
                }
            })
        }
  
    } else {
        jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS, async (err ,decoded) => {
            if(err) {
                return res.json({valid: false, message: "Invalid Token"})
            } else {
            req.user = await User.findById(decoded.userId).select('-password')
           next()
            }
        })
    }
})

// // Protect routes
// const protect  = asyncHandler(async (req, res, next)=>{
//     let token;

//     //Read the jwt from cookie
//     token = req.cookies.jwt

//     if(token){
//         try {
//            const decoded = jwt.verify(token,process.env.JWT_SECRET)
//            req.user = await User.findById(decoded.userId).select('-password')
//            next()
//         } catch (error) {
//             res.status(401)
//             throw new Error('Not authorised,token failed')
//         }

//     }else{
//         res.status(401)
//         throw new Error('Not authorised,no token')
//     }

// })

// Admin middleware

const admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('Not Authorised as Admin')
    }
}

export {protect,admin}