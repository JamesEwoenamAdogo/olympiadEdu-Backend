import express from "express";
import { addExamination, addQuestion, allExam ,course,deleteExam,getOneExam,updateOneExam, updateQuestion} from "../Controllers/examinationController.js";
import upload from "../Middlewares/UploadFile.js";
import { CourseReview, fetchCourseReviews, fetchQuizReviews, QuizReview } from "../Controllers/analysisController.js";

const router = express.Router();

// Handle multiple file uploads
router.post(
  "/add-exam",
  upload.upload.fields([
    { name: "image", maxCount: 1 }, // Main quiz image
    { name: "questionImages", maxCount: 20 }, // Multiple question images
  ]),
  addExamination
);

router.get("/all-exams", allExam);

router.get("/all-exams/:id", getOneExam)
router.put("/update-exams/:id",upload.upload.single("image"), updateOneExam)
router.put("/update-question/:id/:questionIndex",upload.upload.single("image"),updateQuestion)
router.put("/delete-exam/:id", deleteExam)
router.put("/add-question/:id",upload.upload.single("image"), addQuestion)

router.post("/quiz-review",QuizReview)
router.get("/fetch-quiz-review/:userId/:quizId",fetchQuizReviews)

router.post("/course-review",CourseReview)
router.get("/fetch-course-review/:userId/:courseId",fetchCourseReviews)

export default  router;
