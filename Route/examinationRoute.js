import express from "express";
import { addExamination, allExam ,getOneExam} from "../Controllers/examinationController.js";
import upload from "../Middlewares/UploadFile.js";

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

export default  router;
