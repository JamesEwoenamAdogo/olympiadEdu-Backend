import { performanceDataModel } from "../Model/PerformanceData.js";
import { learningResourcesModel } from "../Model/LearningResourceAnalysis.js";
import { subjectDistributionModel } from "../Model/SubjectDistribution.js";
import { assessmentAnalysisModel } from "../Model/AssessmentAnalysis.js";
import { quizReviewModel } from "../Model/QuizReview.js";
import { courseReviewModel } from "../Model/CourseReview.js";
import { userModel } from "../Model/userModel.js";
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
        const existing = await quizReviewModel.find({userId:req.body.userId,quizId:req.body.quizId})
        const userDetails = await userModel.findById(req.body.userId)
      
        console.log()

        if(existing.length==1){
            const update = await quizReviewModel.findByIdAndUpdate(existing[0]._id,{...req.body,grade:userDetails.grade,school:userDetails.School,fullName:`${userDetails.firstName} ${userDetails.lastName}`},{new:true})
            return res.json({success:true,update})
        }
        const newReview = await new quizReviewModel({...req.body,grade:userDetails.grade,school:userDetails.School,fullName:`${userDetails.firstName} ${userDetails.lastName}`})
        newReview.save()
        return res.json({success:true, message:"success"})




    }catch(error){
        console.log(error)
    }
}

export const fetchQuizReviews= async(req,res)=>{

    try{
        const {userId,quizId} = req.params
        const quizReview = await quizReviewModel.find({userId, quizId})
        return res.json({success:true,message:"success",quizReview})


    }catch(error){
        console.log(error)
    }
}

export const CourseReview = async(req,res)=>{
    try{
        const existing = await courseReviewModel.find({userId:req.body.userId,courseId:req.body.courseId})
        if(existing.length==1){
            const update = await courseReviewModel.findByIdAndUpdate(existing[0]._id,req.body,{new:true})
            return res.json({success:true,update})
        }
        const newReview = await new courseReviewModel(req.body)
        newReview.save()
        return res.json({success:true, message:"success"})




    }catch(error){
        console.log(error)
    }
}

export const fetchCourseReviews= async(req,res)=>{

    try{
        const {userId,courseId} = req.params
        
        const courseReview = await courseReviewModel.find({userId, courseId})

        return res.json({success:true,message:"success",courseReview})


    }catch(error){
        console.log(error)
    }
}

export const fetchQuizResults= async(req,res)=>{
    try{
        const {quizId,year}=req.params
        const results = await quizReviewModel.find({quizId,year})
        return res.json({success:true,results})


    }catch(error){
        console.log(error)
    }


}