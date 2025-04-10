import { performanceDataModel } from "../Model/PerformanceData.js";
import { learningResourcesModel } from "../Model/LearningResourceAnalysis.js";
import { subjectDistributionModel } from "../Model/SubjectDistribution.js";
import { assessmentAnalysisModel } from "../Model/AssessmentAnalysis.js";


export const assessAnalyticsController = async(req,res)=>{
    try{
        const {userId,details}= req.body
        const existing = await assessmentAnalysisModel.find({userId})
        if(existing.length==1){
            const updateAnalytics = await assessmentAnalysisModel.findByIdAndUpdate(existing[0]._id,{details:[...existing[0].details,details]},{new:true})
            
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
        const allAssessments = assessmentAnalysisModel.find({})
        return res.json({success,allAssessments})


    }catch(error){
        console.log(error)
    }
}

export const LearningResourceAnalysisController = async(req,res)=>{
    try{
        const {userId,learningAnalytics}= req.body
        const existing = await learningResourcesModel.find({userId})
        if(existing.length==1){
            const updateAnalytics = await learningResourcesModel.findByIdAndUpdate(existing[0]._id,{learningAnalytics:[...existing[0].learningAnalytics,learningAnalytics]},{new:true})
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
    const allLearningResourceData = await learningResourcesModel.find({})
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

