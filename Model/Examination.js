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
    allowReview:{
        type:Boolean
    },
    questions:{
        type:[Object]
    },
    featured:{
        type:Boolean
    },
    registered:{
        type:[String],
        default:[""]
    }
}, {timestamps:true})

export const examinationModel = mongoose.model("exam",examinationSchema)