import mongoose from "mongoose"

const assessMentAnalysisSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    details:{
        type:[Object]
    }
    
},{timestamps:true})

export const assessmentAnalysisModel = mongoose.model("assessment",assessMentAnalysisSchema)