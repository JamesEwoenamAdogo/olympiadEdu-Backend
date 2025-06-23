import express from "express"
// import upload from "../Middlewares/UploadFile.js"
import {  courseThumbnailUpload } from "../Middlewares/UploadFile.js"
import multer from "multer"
// import router from "./examinationRoute"
import { courseFileUpload,courseUpload, allCourses,course, updateCourseThumbnail, updateCourseDetails, updateCourseFiles,fetchCourseDetails,courseDetailsUpload,courseInfoUpload} from "../Controllers/examinationController.js"


export const courseRoute = express.Router()
const upload = multer({
    storage: multer.memoryStorage(),
  });
// courseRoute.post("/upload/video",upload.array("video"),courseVideoUpload)
courseRoute.post("/upload/file",upload.fields([{name:"thumbnail"},{name:"files"}]),courseFileUpload)
courseRoute.get("/all-courses",allCourses)

courseRoute.post("/course",courseUpload)
courseRoute.get("/course/:id", course)
courseRoute.put("/update-course-thumbnail/:id",upload.fields([{name:"thumbnail"},{name:"files"}]), updateCourseThumbnail)
courseRoute.put("/update-course-files/:id", upload.fields([{name:"thumbnail"},{name:"files"}]), updateCourseFiles)

courseRoute.get("/fetch-course-details/:courseId",fetchCourseDetails)
courseRoute.post("/upload-course-details/:courseId",upload.fields([{name:"image"},{name:"files"}]),courseDetailsUpload)
courseRoute.post("/upload-course-info",courseThumbnailUpload.single("thumbnail"),courseInfoUpload)
courseRoute.put("/update-course-details/:id",upload.fields([{name:"image"},{name:"files"}]), updateCourseDetails)





