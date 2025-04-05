import mongoose from "mongoose"

const courseModel = new mongoose.Schema({
    title:{
        type:String
    },
    grade:{
        type:String
    },
    thumbnail:{
      type:String  
    },
    files:{
        type:[Object]
    },
    registered:{
        type:[String]
    }
},{timestamps:true})


export const courseSchema = mongoose.model("course",courseModel)
