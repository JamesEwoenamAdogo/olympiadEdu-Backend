import mongoose from "mongoose"


const interestModel = new mongoose.Schema({
    name:{
        type:String
    }
}, {timestamps:true})

export const interestSchema = mongoose.model("interest",interestModel)