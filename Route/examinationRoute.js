import express from "express";
import { addExamination, allExam ,course,getOneExam,updateOneExam} from "../Controllers/examinationController.js";
import upload from "../Middlewares/UploadFile.js";
import { fetchQuizReviews, QuizReview } from "../Controllers/analysisController.js";

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

router.post("/quiz-review",QuizReview)
router.get("/fetch-quiz-review/:id",fetchQuizReviews)

export default  router;
