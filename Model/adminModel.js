import mongoose from "mongoose";


const adminModel = new mongoose.Schema({
   
    email:{
        type:String
    },
    password:{
        type:String
    }
},{timestamps:true})

export const adminSchema = mongoose.model("admin", adminModel)
