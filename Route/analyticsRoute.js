import express from "express"
import { assessAnalyticsController,PerformanceDataController,SubjectDistributionController,LearningResourceAnalysisController, allAssessment, allLearningResourceAnalytics, fetchQuizResults, fetchQUizHistory } from "../Controllers/analysisController.js"

export const analyticsRoutes = express.Router()

analyticsRoutes.post("/assessment-analytics",assessAnalyticsController)
analyticsRoutes.get("/all-assessment-analytics/:id",allAssessment)

analyticsRoutes.post("/performance-analytics",PerformanceDataController)


analyticsRoutes.post("/subject-distribution-analytics",SubjectDistributionController)

analyticsRoutes.get("/fetch-results/:quizId/:year",fetchQuizResults)


analyticsRoutes.post("/learning-resource-analytics",LearningResourceAnalysisController)
analyticsRoutes.get("/all-learning-resource-analytics/:id",allLearningResourceAnalytics)
analyticsRoutes.get("/quiz-details/:userId",fetchQUizHistory)
