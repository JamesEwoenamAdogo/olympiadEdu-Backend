import mongoose from "mongoose";

const courseDetails = new mongoose.Schema({
    title:{
        type:String
    },
    courseId:{
        type:String
    },
    image:{
        type:String
    },
    files:{
        type:[String]
    },
    Videos:{
        type:[String]
    },
    description:{
        type:String
    },
    duration:{
        type:String
    },
    additionalResources:{
        type:[String]
    }

},{timestamps:true})

export const courseDetailsModel = mongoose.model("courseDetails",courseDetails)