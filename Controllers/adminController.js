import { userModel } from "../Model/userModel.js";
import { competitionsSchema } from "../Model/Competions.js";
import {adminSchema} from "../Model/adminModel.js"
import { transactionModel } from "../Model/transactionModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { GroupModel } from "../Model/AdminCommunityModel.js";
import { interestSchema } from "../Model/interestModel.js";
import { courseSchema } from "../Model/CourseModels.js";

import { courseInfoModel } from "../Model/CourseInfo.js";




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
        const token = jwt.sign({id:user._id,email:user.email},process.env.TOKEN_SECRET,{expiresIn:"30m"})
    
        
        
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
        // const existingCompetition = await competitionsSchema.findById(id)
        // const updatedSubTypes = existingCompetition.subTypes.push(updateBody)

        const updateCompetition = await competitionsSchema.findByIdAndUpdate(id,updateBody,{new:true})
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


export const fetchTransactions = async(req,res)=>{
    try{
        const allTransactions = await transactionModel.find({})
        return res.json({success:true, transactions:allTransactions})



    }catch(error){
        console.log(error)
        return res.json({success:false})
    }

}



// controllers/groupController.js


export const createGroup = async (req, res) => {
  try {
    const { name, description, category,isOpen,featured, trending } = req.body;

    // Assuming you have middleware to extract the admin user from token
    const userId = req.userId;

    const group = new GroupModel({
      name,
      description,
      createdBy: userId,
      members: [userId], // Admin auto-joins group
      image: req.file ? req.file.path : null,
      category,
      isOpen,
      featured,
      trending
    //   recentDiscussion
    });
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create group' });
  }
};

export const getAllGroups = async(req,res)=>{
    try{
        const allGroups = await GroupModel.find({})
        return res.json({success:true, allGroups})



    }catch(error){
        console.log(error)
    }
}

export const AddInterest = async(req,res)=>{
    try{
        // const interestBody = req.body
        const newInterest = new interestSchema(req.body)
        newInterest.save()
        return res.json({message:"success",interest:newInterest})


    }catch(error){
        console.log(error)
    }
}

export const fetchAllInterests = async(req,res)=>{
    try{
        const allInterest = await interestSchema.find({})
        return res.json({success:"message",allInterest})


    }catch(error){
        console.log(error)
    }
}

export const deleteCourse = async(req,res) =>{
    try{
     const {courseId}= req.params
     const deleteCourse = await courseInfoModel.findByIdAndDelete(courseId)
     return res.json({success:true})


    }catch(error){
        console.log(error)
    }
}
