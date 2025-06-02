import mongoose from "mongoose";


const profileImagesSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    image:{
        type:String
    }
},{timestamps:true})


export const profileImageModel = mongoose.model("picture",profileImagesSchema)
