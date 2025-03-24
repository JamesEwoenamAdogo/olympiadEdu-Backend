import { examinationModel } from "../Model/Examination";

export const addExamination = async(req,res)=>{
    try{
        const examBody = req.body 
        const newExam = new examinationModel(examBody)
        newExam.save()
        return res.json({message:"success"})




    }catch(error){
        console.log(error)
        return res.status(500).json({message:"error"})
    }
}

export const allExam = async(req,res)=>{
    try{
        const allExaminations = await examinationModel.find({})
        if(allExaminations){
            return res.json({message:"success"})
        }


    }catch(error){
        console.log(error)
        return res.status(500).json({message:"error"})
    }
}