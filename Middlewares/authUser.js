import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { Socket } from "socket.io"
dotenv.config()

export const authenticateUser = async(req,res,next)=>{
    try{
        const token = req.headers.token
        console.log(token)
        const verifyUser = jwt.verify(token,process.env.TOKEN_SECRET)
        if(!token){
            return res.json({success:false, message:"User not logged in"})
        }
        if(!verifyUser){
            return res.json({success: false, message:"invalid token"})
        }

        req.userId = verifyUser.id

        
        
        next()

    }catch(error){
        console.log(error)
    }
    
        


}