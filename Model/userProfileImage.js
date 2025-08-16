import mongoose from "mongoose"

const userprofileImage = new mongoose.Schema({
    userId:{
        type:String
    },
    image:{
        type:String
    }
},{timestamps:true})


export const profileImage = mongoose.model("profileImage",userprofileImage)