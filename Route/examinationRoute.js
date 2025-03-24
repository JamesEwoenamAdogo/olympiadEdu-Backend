import express from "express"
import { addExamination , allExam } from "../Controllers/examinationController"

export const examRoute = express.Router()

examRoute.post("/add-exam",addExamination)
examRoute.post("/all-exam", allExam)