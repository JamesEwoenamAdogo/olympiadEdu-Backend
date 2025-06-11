import mongoose from "mongoose"

const competitions = new mongoose.Schema({
    name:{
        type:String,
        
    },
    startDate:{
        type:String
    },
    EndDate:{
        type:String
    },
    Description:{
        type:String
    },
    subTypes:{
        type:[Object]
    },
    cost:{
        type:Number
    },
    addOnsCost:{
        type:Number
    },
    type:{
        type:[String]
    },
    registerLink:{
        type:String,
        default:""
    },
    year:{
        type:String
    }

}, {timestamps:true})

export const competitionsSchema = await mongoose.model("competition",competitions)