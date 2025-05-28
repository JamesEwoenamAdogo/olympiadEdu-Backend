import mongoose from "mongoose";

const quizReviewSchema = new mongoose.Schema({
    quizId:{
        type:String
    },
    userId:{
     type:String
    },
    review:{
        type:[Object]
    }
},{timestamps:true})




export const quizReviewModel = mongoose.model("quizReview",quizReviewSchema)