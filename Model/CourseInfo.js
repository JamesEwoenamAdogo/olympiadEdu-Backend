import mongoose from "mongoose"


const courseInfo = new mongoose.Schema({
    title:{
        type:String
    },
    grade:{
        type:[String]
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
    },
    cost:{
        type:String
    },
    instructor:{
        type:String

    },
    tags:{
        type:[String]
    },
    features:{
        type:String
    },
    type:{
        type:String
    },
    level:{
        type:String
    }
    // progress
},{timestamps:true})



export const courseInfoModel = mongoose.model("courseInfo",courseInfo)


