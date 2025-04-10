import mongoose from "mongoose"

const learningResourceAnalysisSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    learningAnalytics:{
        type:[Object]
    }
},{timestamps:true})


export const learningResourcesModel = mongoose.model("learning",learningResourceAnalysisSchema)