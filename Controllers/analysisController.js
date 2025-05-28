import { performanceDataModel } from "../Model/PerformanceData.js";
import { learningResourcesModel } from "../Model/LearningResourceAnalysis.js";
import { subjectDistributionModel } from "../Model/SubjectDistribution.js";
import { assessmentAnalysisModel } from "../Model/AssessmentAnalysis.js";
import { quizReviewModel } from "../Model/QuizReview.js";

export const assessAnalyticsController = async(req,res)=>{
    try{
        const {userId,details}= req.body
        const existing = await assessmentAnalysisModel.find({userId})
        if(existing.length==1){
            const updatedDetails = existing[0].details.filter((item)=>{return item.title!==details.title})
            updatedDetails.push(details)
            const updateAnalytics = await assessmentAnalysisModel.findByIdAndUpdate(existing[0]._id,{details: updatedDetails},{new:true})
            return res.json({success:true,update:updateAnalytics})
        }
        const newUpdate = new assessmentAnalysisModel({userId:req.body.userId, details:[details]})
        newUpdate.save()
        return res.json({success:true,newUpdate})

    }catch(error){
        console.log(error)
    }
}
export const allAssessment = async(req,res)=>{
    try{
        const {id}= req.params
        const allAssessments = await assessmentAnalysisModel.find({userId:id})
        return res.json({success:true,allAssessments})


    }catch(error){
        console.log(error)
    }
}

export const LearningResourceAnalysisController = async(req,res)=>{
    try{
        const {userId,learningAnalytics}= req.body
        const existing = await learningResourcesModel.find({userId})
        if(existing.length==1){
            const updatedLearningAnalytics = existing[0].learningAnalytics.filter((item)=>{return item.title!==learningAnalytics.title})
            updatedLearningAnalytics.push(learningAnalytics)
            const updateAnalytics = await learningResourcesModel.findByIdAndUpdate(existing[0]._id,{learningAnalytics:updatedLearningAnalytics},{new:true})
            return res.json({success:true,update:updateAnalytics})
        }
        const newUpdate = new learningResourcesModel({userId, learningAnalytics:[learningAnalytics]})
        newUpdate.save()
        return res.json({success:true, newUpdate})




    }catch(error){
        console.log(error)
    }
}

export const allLearningResourceAnalytics = async(req,res)=>{
    try{
    const {id} = req.params
    const allLearningResourceData = await learningResourcesModel.find({userId:id})
    return res.json({success:true, allLearningData:allLearningResourceData})

    }catch(error){
        console.log(error)
    }
}
export const PerformanceDataController = async(req,res)=>{
    try{
        const {userId,performances}= req.body
        const existing = await performanceDataModel.find({userId})
        if(existing.length==1){
            const updateAnalytics = await performanceDataModel.findByIdAndUpdate(existing._id,{performances:[...existing.performances,performances]},{new:true})
            return res.json({success:true,update:updateAnalytics})
        }
        const newUpdate = new performanceDataModel(req.body)
        newUpdate.save()




    }catch(error){
        console.log(error)
    }
}

export const SubjectDistributionController = async(req,res)=>{
    try{
        const {userId,subjectDistribution}= req.body
        const existing = await subjectDistributionModel.find({userId})
        if(existing.length==1){
            const updateAnalytics = await subjectDistributionModel.findByIdAndUpdate(existing._id,{subjectDistribution:[...existing.subjectDistribution,subjectDistribution]},{new:true})
            return res.json({success:true,update:updateAnalytics})
        }
        const newUpdate = new subjectDistributionModel(req.body)
        newUpdate.save()




    }catch(error){
        console.log(error)
    }
}


export const QuizReview = async(req,res)=>{
    try{
        const newReview = await new quizReviewModel(req.body)
        newReview.save()
        return res.json({success:true, message:"success"})




    }catch(error){
        console.log(error)
    }
}

export const fetchQuizReviews= async(req,res)=>{

    try{
        const id = req.params.id
        const quizReview = await quizReviewModel.find({quizId:id,userId:req.body.userId})
        return res.json({success:true,message:"success",quizReview})


    }catch(error){
        console.log(error)
    }
}