import mongoose from "mongoose"



const coverImageSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    coverImage:{
        type:String
    }
},{timestamps:true})


export const coverImageModel = mongoose.model("coverImage",coverImageSchema)