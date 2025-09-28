import express from "express"
import { addScore, fecthUserScore, fetchContestLeaderBoard, fetchLeaderBoard } from "../Controllers/LeaderBoards.js"


export const leaderBoard = express.Router()
leaderBoard.post("/add-score",addScore)

leaderBoard.get("/fetch-all-scores", fetchLeaderBoard)

leaderBoard.get("/fetch-user-score/:id",fecthUserScore)

leaderBoard.get("/fetch-contest-leaderboard/:contestId",fetchContestLeaderBoard)