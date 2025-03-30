import express from "express"
import upload from "../Middlewares/UploadFile.js"
import {  courseThumbnailUpload } from "../Middlewares/UploadFile.js"
// import router from "./examinationRoute"
import { courseFileUpload, courseVideoUpload ,courseUpload} from "../Controllers/examinationController.js"


export const courseRoute = express.Router()
courseRoute.post("/upload/video",upload.array("video"),courseVideoUpload)
courseRoute.post("/upload/file",upload.array("files"),courseFileUpload)
courseRoute.post("/course",courseUpload)

