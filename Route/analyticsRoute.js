import express from "express"
import { assessAnalyticsController,PerformanceDataController,SubjectDistributionController,LearningResourceAnalysisController } from "../Controllers/analysisController.js"

export const analyticsRoutes = express.Router()

analyticsRoutes.post("/assessment-analytics",assessAnalyticsController)
analyticsRoutes.post("/performance-analytics",PerformanceDataController)
analyticsRoutes.post("/subject-distribution-analytics",SubjectDistributionController)
analyticsRoutes.post("/learning-resource-analytics",LearningResourceAnalysisController)