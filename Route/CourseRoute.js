import express from "express"
import upload from "../Middlewares/UploadFile.js"
import {  courseThumbnailUpload } from "../Middlewares/UploadFile.js"
// import router from "./examinationRoute"
import { courseFileUpload, courseVideoUpload ,courseUpload} from "../Controllers/examinationController.js"


export const courseRoute = express.Router()
courseRoute.post("/upload/video",upload.array("video"),courseVideoUpload)
courseRoute.post("/upload/file",courseThumbnailUpload.fields([{name:thumbnail,maxCount:1},{name:files, maxCount:30}]),courseFileUpload)
courseRoute.post("/course",courseUpload)

