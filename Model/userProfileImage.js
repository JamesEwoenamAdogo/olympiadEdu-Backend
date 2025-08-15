import mongoose from "mongoose"

const proflieImage = new mongoose.Schema({
    userId:{
        type:String
    },
    image:{
        type:String
    }
},{timestamps:true})


export const profileImage = mongoose.model("profileImage",profileImage)