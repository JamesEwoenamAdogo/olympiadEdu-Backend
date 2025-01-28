import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    DOB:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    mobileNumber:{
        type:String
    },
    Category:{
        type:String
    },
    educationalLevel:{
        type:String
    },
    grade:{
        type:String
    },
    purposeOfRegistration:{

        type:[String]
    },
    userName:{
        type:String
    },
    gender:{
        type:String
    },
    School:{
        type:String
    },
    country:{
        type:String
    },
    Registered:{
        type:[String]
    },
    Paid:{
        type:[String]
    },
    Invoice:{
        type: [Object]
    },
    AddOns:{
        type:[Object]
    }



},{timestamps:true})


export const userModel = mongoose.model("user", userSchema)