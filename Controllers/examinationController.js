import { examinationModel } from "../Model/Examination.js";
import cloudinary from "../utils/cloudinaryConfig.js";



export const addExamination = async (req, res) => {
    try {
      const { title, description, time, numberOfQuestions, questions } = req.body;
      const parsedQuestions = JSON.parse(questions);
  
      // Get uploaded quiz image URL
      const quizImageUrl = req.files.image ? req.files.image[0].path : "";
  
      // Process question images
      const processedQuestions = parsedQuestions.map((item, index) => {
        if (req.files.questionImages && req.files.questionImages[index]) {
          item.image = req.files.questionImages[index].path; // Cloudinary URL
        }
        return item;
      });
  
      // Save to MongoDB
      const newQuiz = new examinationModel({
        title,
        description,
        time,
        numberOfQuestions,
        questions: processedQuestions,
        image: quizImageUrl,
      });
  
      await newQuiz.save();
      return res.json({ success: true, message: "Quiz created successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Error creating quiz" });
    }
  };
  

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
