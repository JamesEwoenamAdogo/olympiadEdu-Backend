import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema({
    feedBack:{
        type:String
    }
},{timestamps:true})

export const feedBackModel = mongoose.model("feedback", feedbackSchema)