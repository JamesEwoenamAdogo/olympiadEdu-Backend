import { examinationModel } from "../Model/Examination.js";
import cloudinary from "../utils/cloudinaryConfig.js";



export const addExamination = async(req,res)=>{
    try{
        const { title, description, time, numberOfQuestions, questions } = req.body;
        console.log(req.body)

        const parsedQuestions = JSON.parse(questions)

        let publicId
        
        await cloudinary.uploader.upload(req.file.path, (err, result)=>{
            if(err){
                console.log(err)
                return  res.status(500).json({sucess:false,message:"Error"})
                
            }
            res.json({success:true,message:"Picture uploaded",data: result})
           
            publicId = result.public_id
           

        });


        const newQuiz = new examinationModel({title,description,time,numberOfQuestions,questions:parsedQuestions,image:publicId})
        newQuiz.save()
        return res.json({success:true, message:"success"})




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