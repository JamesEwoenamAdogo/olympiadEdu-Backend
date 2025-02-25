import mongoose from "mongoose";

const addOns = mongoose.Schema({
    name:{
        type:String
    },
    resources:{
        type:Array,
        default:[]
    }
})

export const addOnModel = mongoose.model("addOns",addOns)