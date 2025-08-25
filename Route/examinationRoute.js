import express from "express";
import { addExamination, addQuestion, allExam ,allExamAdmin,course,deleteExam,getOneExam,updateOneExam, updateQuestion} from "../Controllers/examinationController.js";
import upload from "../Middlewares/UploadFile.js";
import { CourseReview, fetchCourseReviews, fetchQuizReviews, QuizReview } from "../Controllers/analysisController.js";

const router = express.Router();

// Handle multiple file uploads
const fields = [
  { name: "image", maxCount: 1 },
  ...Array.from({ length: 40 }, (_, i) => ({ name: `questionImages[${i}]`, maxCount: 1 }))
];
router.post(
  "/add-exam",
  upload.upload.any(),
  addExamination
);

router.get("/all-exams", allExam);
router.get("/all-exams-admin", allExamAdmin);

router.get("/all-exams/:id", getOneExam)
router.put("/update-exams/:id",upload.upload.single("image"), updateOneExam)
router.put("/update-question/:id/:questionIndex",upload.upload.single("image"),updateQuestion)
router.delete("/delete-exam/:id", deleteExam)
router.put("/add-question/:id",upload.upload.single("image"), addQuestion)

router.post("/quiz-review",QuizReview)
router.get("/fetch-quiz-review/:userId/:quizId",fetchQuizReviews)

router.post("/course-review",CourseReview)
router.get("/fetch-course-review/:userId/:courseId",fetchCourseReviews)

export default  router;
