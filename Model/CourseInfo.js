import mongoose from "mongoose"


const courseInfo = new mongoose.Schema({
    title:{
        type:String
    },
    grade:{
        type:String
    },
    description:{
        type:String
    },
    category:{
        type:String
    },
    featured:{
        type:String
    },
    thumbnail:{
        type:String
    },
    program:{
        type:[String]
    },
    duration:{
        type:String
    },
    publish:{
        type:Boolean
    }
    // progress
},{timestamps:true})



export const courseInfoModel = mongoose.model("courseInfo",courseInfo)


