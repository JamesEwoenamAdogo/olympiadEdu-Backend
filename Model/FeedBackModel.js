import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema({
    quiz:{
        type:String
    },
    feedback:{
        type:String
    }
},{timestamps:true})

export const feedBackModel = mongoose.model("feedback", feedbackSchema)