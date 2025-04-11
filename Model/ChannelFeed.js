import mongoose from "mongoose";

const channeFeed = new mongoose.Schema({
    channelId:{
        type:String
    },
    messages:{
        type:[Object]
    }
}, {timestamps:true})


export const channelFeedModel = mongoose.model("feed",channeFeed)