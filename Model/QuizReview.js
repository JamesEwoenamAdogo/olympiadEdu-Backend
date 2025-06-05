import mongoose from "mongoose";

const quizReviewSchema = new mongoose.Schema({
    quizId:{
        type:String
    },
    userId:{
     type:String
    },
    score:{
        type:Number
    },
    date:{
      type:String
    },
    fullName:{
        type:String
    },
    school:{
        type:String
    },
    grade:{
        type:String
    },
    correctAnswers:{
        type:Number
    },
    numberOfQuestions:{
        type:Number
    },
    year:{
        type:String
    },
    review:{
        type:[Object]
    }
},{timestamps:true})




export const quizReviewModel = mongoose.model("quizReview",quizReviewSchema)