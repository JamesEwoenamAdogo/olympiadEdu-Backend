import { challengeLeaderBoard } from "../Model/ChallengeLeaderBoard.js";

export const addScore = async(req,res)=>{
    try{
        const {userId}= req.body
        const existing = await challengeLeaderBoard.find({userId})
        if(existing.length==1){
            const update = await challengeLeaderBoard.findByIdAndUpdate(existing[0]._id,req.body,{new:true})
            return res.json({success:true,update})
        }
        const newScore = new challengeLeaderBoard(req.body)
        newScore.save()

    }catch(error){
        console.log(error)

    }
}


export const fetchLeaderBoard = async(req,res)=>{
    try{
        const allScores = await challengeLeaderBoard.find({})
        return res.json({success:true,allScores})


    }catch(error){
        console.log(error)
    }
}

export const fecthUserScore= async(req,res)=>{

    try{
        const {id}= req.params
        const userScore = await challengeLeaderBoard.find({userId:id})
        return res.json({success:true,userScore})


    }catch(error){
        console.log(error)
    }
}


export const fetchContestLeaderBoard = async(req,res)=>{
    try{
        const {contestId} = req.params
        const leaderboard = await challengeLeaderBoard.find({courseId:contestId})

        return res.json({success:true,leaderboard})





    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}