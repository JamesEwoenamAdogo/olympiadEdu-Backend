import express from "express"
import { addExamination , allExam } from "../Controllers/examinationController.js"
import { upload } from "../Middlewares/UploadFile.js"

export const examRoute = express.Router()



examRoute.post("/add-exam",upload.single("image"),addExamination)
examRoute.post("/all-exam", allExam)