import mongoose from "mongoose"

const examinationSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    grade:{
        type: String
    },
    time:{
        type:Number
    },
    numberOfQuestions:{
        type:Number
    },
    attemptsAllowed:{
        type:Number
    },
    publish:{
        type:Boolean
    },
    image:{
        type:String
    },
    allowQuizReview:{
        type:Boolean
    },
    questions:{
        type:[Object]
    },
    featured:{
        type:Boolean
    },
    displayScores:{
        type:Boolean
    },
    showFeedBackForm:{
        type:Boolean
    },
    registered:{
        type:[String],
        default:[""]
    }
}, {timestamps:true})

export const examinationModel = mongoose.model("exam",examinationSchema)