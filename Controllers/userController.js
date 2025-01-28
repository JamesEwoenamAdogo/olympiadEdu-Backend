import { userModel } from "../Model/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import dotenv from "dotenv"
import { competitionsSchema } from "../Model/Competions.js";
dotenv.config()




export const addUser = async(req,res)=>{
    try{
        const {firstName, lastName,DOB,email,password,mobileNumber,Category,educationalLevel,grade,purpose_Of_Registration,gender,School,country}= req.body
        console.log(firstName,lastName,DOB, email,password,mobileNumber,Category,educationalLevel,grade,country,School,gender,purpose_Of_Registration)
        const existingUser = await userModel.find({email})
        const allCompetitions = await competitionsSchema.find({})
        const exsitingUserByPhoneNumber = await userModel.find({mobileNumber})
        
        if(existingUser.length==1){
            console.log(existingUser)
            return res.json({success:false,message:"User email already registered"})
        }
        if(exsitingUserByPhoneNumber.length==1){
            return res.json({success:false,message:"Phone Number already registered"})
        }

        let userExams= []
        for(let exam of purpose_Of_Registration){
            let examinations = allCompetitions.filter((item)=>{return item.name == exam})
            userExams.push(examinations)

        }
        const hashedPassword = await bcrypt.hash(password,10)
        const userName = email.split("@")[0]+ Math.ceil(Math.random()*1000000)
        const newUser= new userModel({firstName,lastName,DOB,email,password:hashedPassword,mobileNumber,Category,educationalLevel,grade,purpose_Of_Registration:userExams,userName,gender,School,country})



      

        newUser.save()
        const token = jwt.sign({id:newUser._id,firstName:newUser.firstName, lastName:newUser.lastName,userName:newUser.userName,Registered:newUser.Registered,Paid:newUser.Paid, Invoice:newUser.Invoice},process.env.TOKEN_SECRET, {expiresIn:"30m"})
       
        return res.json({success:true, message:"User Created successfully",token,userName,purpose_Of_Registration:userExams})







    }catch(error){
        console.log(error)
        return res.status(500).json({success:false})
    }





}



export const loginUser = async(req,res)=>{
    try{
        if(req.body['email']){
            const checkExisting = await userModel.find({email:req.body.email})
            if(checkExisting.length==0){
                return res.json({success:false,message:"User not found"})

            }
            const comparePassword = bcrypt.compare(checkExisting[0].password,req.body.password)
            if(!comparePassword){
                return res.json({success:false,message:"Invalid credentials"})
            }
            const token = jwt.sign({id:checkExisting[0]._id,firstName:checkExisting[0].firstName, lastName:checkExisting[0].lastName},process.env.TOKEN_SECRET, {expiresIn:"30m"})
            return res.json({success:true,token,message:"User created successfully"})
        }

        if(req.body['userName']){
            const checkExisting = await userModel.find({userName:req.body.userName})
            if(!checkExisting.length==0){
                return res.json({success:false,message:"User not found"})

            }
            const comparePassword = bcrypt.compare(checkExisting[0].password,req.body.password)
            if(!comparePassword){
                return res.json({success:false,message:"Invalid credentials"})
            }
            const token = jwt.sign({id:checkExisting[0]._id,firstName:checkExisting[0].firstName, lastName:checkExisting[0].lastName,Registered:checkExisting[0].Registered,Paid:checkExisting[0].Paid, Invoice:checkExisting[0].Invoice},process.env.MONGO_SECRET, {expiresIn:"30m"})
            return res.json({success:true,token,message:"User created successfully"})
        }



    }catch(error){
        console.log(error)
        return res.status(500).json({success:false})
    }
}

export const fetchUsers = async(req,res)=>{
    try{
        const allUsers = await userModel.find({})
        res.json({success:true, user:allUsers})

        
        



    }catch(error){
        console.log(error)
        res.status(500).json({message:"Error",success:false})
    }
}

export const updateUsers = async(req,res)=>{
    try{
        const id = req.userId
        const updateBody = req.body
        const updateUser = await competitionsSchema.findByIdAndUpdate(id,updateBody,{new:true})
        if(!updateUser){
            return res.json({succes:false,message:"Success"})
        }
        return res.json({success:true,message:"Success"})
        




    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Error"})
    }
}