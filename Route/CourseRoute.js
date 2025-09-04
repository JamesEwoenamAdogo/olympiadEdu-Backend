import express from "express"
// import upload from "../Middlewares/UploadFile.js"
import {  courseThumbnailUpload } from "../Middlewares/UploadFile.js"
import multer from "multer"
// import router from "./examinationRoute"
import { courseFileUpload,courseUpload, allCourses,course, updateCourseThumbnail, updateCourseDetails, updateCourseFiles,fetchCourseDetails,courseDetailsUpload,courseInfoUpload, fetchCourseInfo, updateCourseInfo, deleteCourseModule, updateCourseModule, allCoursesInfo,allCoursesAdminInfo} from "../Controllers/examinationController.js"


export const courseRoute = express.Router()
const upload = multer({
    storage: multer.memoryStorage(),
  });
// courseRoute.post("/upload/video",upload.array("video"),courseVideoUpload)
courseRoute.post("/upload/file",upload.fields([{name:"thumbnail"},{name:"files"}]),courseFileUpload)
courseRoute.get("/all-courses",allCourses)
courseRoute.get("/all-courses-info",allCoursesInfo)
courseRoute.get("/all-courses-admin-info",allCoursesAdminInfo)

courseRoute.post("/course",courseUpload)
courseRoute.get("/course/:id", course)
courseRoute.put("/update-course-thumbnail/:id",upload.fields([{name:"thumbnail"},{name:"files"}]), updateCourseThumbnail)
courseRoute.put("/update-course-files/:id", upload.fields([{name:"thumbnail"},{name:"files"}]), updateCourseFiles)

courseRoute.get("/fetch-course-details/:courseId",fetchCourseDetails)
courseRoute.post("/upload-course-details/:courseId",upload.fields([{name:"image"},{name:"files"}]),courseDetailsUpload)
courseRoute.post("/upload-course-info",courseThumbnailUpload.single("thumbnail"),courseInfoUpload)
courseRoute.get("/fetch-course-info/:id",fetchCourseInfo)

courseRoute.delete("/delete-module/:id",deleteCourseModule)
courseRoute.put("/update-module/:id",upload.fields([{name:"image"},{name:"files"}]),updateCourseModule)

courseRoute.put("/update-course-info/:id",upload.single("thumbnail"),updateCourseInfo)
courseRoute.put("/update-course-details/:id",upload.fields([{name:"image"},{name:"files"}]), updateCourseDetails)





