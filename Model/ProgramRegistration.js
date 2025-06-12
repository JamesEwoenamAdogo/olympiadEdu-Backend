import mongoose from "mongoose"

const programReg = new mongoose.Schema({
    program:{
        type:String
    },
    year:{
        type:String
    },
    fullName:{
        type:String
    },
    grade:{
        type:String
    },
    cost:{
        type:Number
    },
    assessment:{
        type:Boolean
    },
    course:{
        type:Boolean
    },
    status:{
        type:String
    },
},{timestamps:true})

export const programsRegistration = mongoose.model("programReg",programReg)