import { userModel } from "../Model/userModel.js";
import { competitionsSchema } from "../Model/Competions.js";
import {adminSchema} from "../Model/adminModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"



export const adminSignUp = async(req,res)=>{
    try{
        const {email,password} = req.body
        const existingUser = await adminSchema.findOne({email})
        if(existingUser){
            return res.json({success:false,message:"user already registered"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await new adminSchema({email,password:hashedPassword})
        newUser.save()
        return res.json({success:true,message:"Admin added successfully"})
        
        
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Error"})
    }
}
export const LoginUser = async(req,res)=>{
    try{
        const {email,password}= req.body
        const user = await adminSchema.findOne({email})
        if(!user){
            return res.json({success:false,message:"user does not exist"})
        }
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            return res.json({success:false, message:"invalid credentials"})
        }
        const token = jwt.sign({id:user._id,email:user.email},process.env.TOKEN_SECRET)
    
        
        
        return res.json({token:token,success:true,message:"login successful"})

    }catch(error){
        console.log(error)
        res.status(500).json({message:"error"})
    }
}
export const registeredForUsers = async(req, res)=>{

    try{
        const {name} = req.params
        const allUsers = userModel.find({})
        const registeredFor = allUsers.filter((item)=>{
            const registeredList = item.Registered
            for(let RegisteredListItem of registeredList){
                if(RegisteredListItem==name){
                    return item
                }
            }

        })

        return res.json({registeredFor})



    }catch(error){
        console.log(error)
        return res.status(500).json({message:"error"})
    }
}

export const paidForUsers = async(req, res)=>{

    try{
        const {name} = req.params
        const allUsers = userModel.find({})
        const paidFor = allUsers.filter((item)=>{
            const paidList = item.Paid
            for(let paidListItem of paidList){
                if(paidListItem==name){
                    return item
                }
            }

        })

        return res.json({paidFor})



    }catch(error){
        console.log(error)
        return res.status(500).json({message:"error"})
    }
}

export const addCompetition = async(req,res)=>{
    try{
        const competition = req.body
        const newUser = new competitionsSchema(competition)
        newUser.save()
        return res.json({success:true,message:"Added successfully"})



    }catch(error){
        console.log(error)
        return res.status(500).json({success:false, message:"Error"})
    }
}

export const AllCompetitions = async(req,res)=>{
    try{
        const all = await competitionsSchema.find({})
        return res.json({success:true,AllCompetitions:all})


    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Error", success:false})
    }
}

export const findOneCompetion = async(req,res)=>{
    try{
        const {id}= req.params
        const existingCompetitions = competitionsSchema.findById(id)
        if(!existingC){
            return res.json({success:false, message:"not existing"})
        }
        return res.json({success:true, message:'success'})


    }catch(error){
        console.log(error)
        return res.status(500).json({succes:false,message:"false"})
    }
}

export const updateCompetition = async (req,res)=>{
    try{
        const {id}= req.params
        const updateBody = req.body 
        const existingCompetition = await competitionsSchema.findById(id)
        const updatedSubTypes = existingCompetition.subTypes.push(updateBody)

        const updateCompetition = await competitionsSchema.findByIdAndUpdate(id,{subTypes:updatedSubTypes},{new:true})
        if(!updateCompetition){
            return res.json({success:false, message:"Update not completed"})
        }
        return res.json({success:true,message:"Success"})



    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Error"})
    }
}

export const deleteCompetition = async(req,res)=>{
    try{
        const {id}= req.params
        const deleteCompetition = await competitionsSchema.findByIdAndDelete(id)
        return res.status(200).json({success:true, message:"success"})

    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:true})
    }
}



