import express from "express"
import { assessAnalyticsController,PerformanceDataController,SubjectDistributionController,LearningResourceAnalysisController, allAssessment, allLearningResourceAnalytics } from "../Controllers/analysisController.js"

export const analyticsRoutes = express.Router()

analyticsRoutes.post("/assessment-analytics",assessAnalyticsController)
analyticsRoutes.get("/all-assessment-analytics",allAssessment)

analyticsRoutes.post("/performance-analytics",PerformanceDataController)


analyticsRoutes.post("/subject-distribution-analytics",SubjectDistributionController)


analyticsRoutes.post("/learning-resource-analytics",LearningResourceAnalysisController)
analyticsRoutes.get("/all-learning-resource-analytics",allLearningResourceAnalytics)
