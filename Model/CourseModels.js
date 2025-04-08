import mongoose from "mongoose"

const courseModel = new mongoose.Schema({
    title:{
        type:String
    },
    description: {
        type:String
    },
    grade:{
        type:String
    },
    image:{
      type:String  
    },
    files:{
        type:[Object]
    },
    category:{
        type:String
    },
    duration:{
        type:String
    },
    level:{
        type:String
    },
    featured:{
        type:String
    },
    rating:{
        type:Number,
        default:5
    },
    tags:{
        type:[String]
    },
    registered:{
        type:[String],
        default:[""]
    }
},{timestamps:true})


export const courseSchema = mongoose.model("course",courseModel)
