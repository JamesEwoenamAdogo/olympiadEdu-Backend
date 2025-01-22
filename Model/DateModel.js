import mongoose from "mongoose";


const dateModel = new mongoose.Schema({
    id:{
        type:String
    },
    title:{
        type:String
    },
    start:{
        type:String
    },
    end:{
        type:String
    },
    SelectedDate:{
        type:String
    }
},{timestamps:true})

export const DateSchema = mongoose.model("date", dateModel)