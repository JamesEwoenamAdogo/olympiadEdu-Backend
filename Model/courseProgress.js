import mongoose from "mongoose";


const courseProgress = new mongoose.Schema({
    userId:{
        type:String
    },
    courseId:{
        type:String
    },
    moduleId:{
        type:String
    },
    completed:{
        type:Boolean
    }
},{timestamps:true})


export const courseProgressModel = mongoose.model("courseProgress",courseProgress)