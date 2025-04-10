import mongoose from "mongoose";


const subjectDistribution = new mongoose.Schema({
    userId:{
        type:String
    },
    subjectDistribution:{
        type:[Object]
    }
},{timestamps:true})

export const subjectDistributionModel = mongoose.model("subjectDistribution",subjectDistribution)