import { challengeLeaderBoard } from "../Model/ChallengeLeaderBoard.js";

const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

export const addScore = async(req,res)=>{
    try{
        const {userId}= req.body

        const existing = await challengeLeaderBoard.find({userId,courseId:req.body.courseId})

        const userScore = await challengeLeaderBoard.find({courseId:req.body.courseId})

        if(existing.length==1){
            const attemptsMade = existing.attemptsMade+1
            const update = await challengeLeaderBoard.findByIdAndUpdate(existing[0]._id,{...req.body,attemptsMade},{new:true})

            console.log(userScore)

            const sortedRankings = userScore.sort((a,b)=>{
            if(a.score!==b.score){
                return b.score - a.score
            }
            return parseInt(formatTime(a.timeTaken.replace(":", "")))- parseInt(formatTime(b.timeTaken.replace(":", " ")))
        })

        const score = sortedRankings.map((item,index)=>{
            return {
                ...item,
                rank: index+1
            }
        })

        const rank = score.find((item)=>item._doc.userId == userId)

        console.log(rank)

        return res.json({success:true,rank:rank.rank})
            
            // return res.json({success:true,update})
        }
        const attemptsMade =1

        const newScore = new challengeLeaderBoard({...req.body, attemptsMade})

        newScore.save()


        const sortedRankings = userScore.sort((a,b)=>{
            if(a.score!==b.score){
                return b.score - a.score
            }
            return parseInt(formatTime(a.timeTaken.replace(":", "")))- parseInt(formatTime(b.timeTaken.replace(":", " ")))
        })

        const score = sortedRankings.map((item,index)=>{
            return {
                ...item,
                rank: index+1
            }
        })

        const rank = score.find((item)=>item._doc.userId == userId)

        return res.json({success:true,rank:rank.rank})


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