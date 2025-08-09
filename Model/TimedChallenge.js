import mongoose from "mongoose";

const TimedChallenge = new mongoose.Schema({
    courseId:{
        type:String
    },
    questions:{
        type:String
    },
    option:{
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