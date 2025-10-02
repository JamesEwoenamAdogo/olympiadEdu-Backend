import mongoose from "mongoose";


const leaderBoard = new mongoose.Schema({
    userId:{
        type:String
    },
    userName:{
        type:String
    },
    courseId:{
        type:String
    },
    score:{
        type:String
    },
    attemptsMade:{
        type:Number,
        default:0
    },
    achievement:{
        type:String
    },
    timeTaken:{
        type:String
    }
},{timestamps:true})

export const challengeLeaderBoard = mongoose.model("leaderBoard",leaderBoard)