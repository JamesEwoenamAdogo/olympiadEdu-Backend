import mongoose from "mongoose"

const competitions = new mongoose.Schema({
    name:{
        type:String,
        
    },
    grade:{
        type:[String]
    },
    startDate:{
        type:String
    },
    EndDate:{
        type:String
    },
    Description:{
        type:String
    },
    subTypes:{
        type:[Object]
    },
    // cost:{
    //     type:Number
    // },
    // addOnsCost:{
    //     type:Number
    // },
    type:{
        type:[String]
    },
    link:{
        type:String,
        default:""
    },
    customizableButton:{
        type:String,
        default:""
    },
    year:{
        type:String
    },
    competitionCost:{
        type:Number
    },
    materialCost:{
        type:Number,
    },
    assessmentCost:{
        type:Number
    },

    courses:{
        type:[String]
    },

    Assessments:{
        type:[String]
    }
    

}, {timestamps:true})

export const competitionsSchema = await mongoose.model("competition",competitions)