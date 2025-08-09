import mongoose from "mongoose";

const TimedChallenge = new mongoose.Schema({
    courseId:{
        type:String
    },
    question:{
        type:String
    },
    options:{
        type:[String]
    },
    correct:{
        type:Number
    },
    time:{
        type:Number
    }
},{timestamps:true})



export const timedChallengeModel= mongoose.model("timeChallenge",TimedChallenge)