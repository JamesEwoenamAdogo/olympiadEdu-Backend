import mongoose from "mongoose"

const courseModel = new mongoose.Schema({
    title:{
        type:String
    },
    modules:[
            {
                title:String,
                videos:[String],
                file:[String]
            }
        ]
    
},{timestamps:true})


export const courseSchema = mongoose.model("course",courseModel)