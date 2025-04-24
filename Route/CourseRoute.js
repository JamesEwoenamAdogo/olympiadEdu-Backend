import express from "express"
// import upload from "../Middlewares/UploadFile.js"
import {  courseThumbnailUpload } from "../Middlewares/UploadFile.js"
import multer from "multer"
// import router from "./examinationRoute"
import { courseFileUpload,courseUpload, allCourses,course, updateCourseThumbnail, updateCourseDetails, updateCourseFiles, updateCourseFilesAfterDelete} from "../Controllers/examinationController.js"


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
courseRoute.put("/update-course-files-after-delete/:id", upload.fields([{name:"thumbnail"},{name:"files"}]), updateCourseFilesAfterDelete)
courseRoute.put("/update-course-details/:id", updateCourseDetails)



