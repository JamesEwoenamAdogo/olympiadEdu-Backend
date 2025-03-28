import express from "express"
import upload, { courseUpload } from "../Middlewares/UploadFile"
// import router from "./examinationRoute"
import { courseFileUpload, courseVideoUpload } from "../Controllers/examinationController"


export const courseRoute = express.Router()
courseRoute.post("/upload/video",upload.array("video"),courseVideoUpload)
courseRoute.post("/upload/file",upload.array("file"),courseFileUpload)

