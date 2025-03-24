import mongoose from "mongoose"

const examinationSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    time:{
        type:Number
    },
    numberOfQuestions:{
        type:Number
    },
    image:{
        type:String
    },
    questions:{
        type:[Object]
    }
}, {timestamps:true})

export const examinationModel = mongoose.model("exam",examinationSchema)