import mongoose from "mongoose";

const courseReview = new mongoose.Schema({

    userId:{
        type:String
    },
    courseId:{
        type: String
    },
    review:{
        type:[Object]
    }

},{timestamps:true})


export const courseReviewModel = mongoose.model("courseReview",courseReview)