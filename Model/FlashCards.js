import mongoose from "mongoose";

const flashCards = new mongoose.Schema({
    courseId:{
        type:String
    },
    question:{
        type:String
    },
    answer:{
        type:String
    },
    difficulty:{
        type:String
    },
    // time:{
    //     type:Number
    // }
},{timestamps:true})



export const flashCardsModel = mongoose.model("flashCards",flashCards)