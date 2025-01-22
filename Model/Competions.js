import mongoose from "mongoose"

const competitions = new mongoose.Schema({
    name:{
        type:"String",
        
    },
    startDate:{
        type:"String"
    },
    EndDate:{
        type:"String"
    },
    Description:{
        type:"String"
    },
    subTypes:{
        type:[Object]
    }

}, {timestamps:true})

export const competitionsSchema = await mongoose.model("competition",competitions)