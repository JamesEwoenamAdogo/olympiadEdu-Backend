import mongoose from "mongoose"

const performanceData = new mongoose.Schema({
    userId:{
        type:String
    },
    performances:{
        type:[Object]
    }
},{timestamps:true})


export const performanceDataModel = mongoose.model("performance",performanceData)