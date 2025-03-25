import express from "express"
import { addExamination , allExam } from "../Controllers/examinationController"
import { upload } from "../Middlewares/UploadFile"

export const examRoute = express.Router()



examRoute.post("/add-exam",upload.single("image"),addExamination)
examRoute.post("/all-exam", allExam)