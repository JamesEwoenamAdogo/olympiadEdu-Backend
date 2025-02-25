import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
    name:{
        type:String,
        
    },
    amount:{
        type:String
    },
    description:{
        type:String
    },
   
    status:{
        type:String
    },
    generatedOn:{
        type:String
    },
    paidOn:{
        type:String
    }

}, {timestamps:true})

export const transactionModel = await mongoose.model("transaction", transactionSchema)