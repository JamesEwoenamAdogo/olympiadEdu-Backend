import mongoose from "mongoose"

const examScoresSchema = new mongoose.Schema({
    quizId:{
        type:String
    },
    name:{
        type:String
    },
    grade:{
        type:String
    },
    school:{
        type:String
    },
    score:{
        type:String
    },
    time:{
        type:String
    }
},{
    timestamps:true
})

export const examScoresModel = mongoose.model("examScore",examScoresSchema)