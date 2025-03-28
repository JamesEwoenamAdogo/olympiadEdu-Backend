import { courseSchema } from "../Model/CourseModels.js";
import { examinationModel } from "../Model/Examination.js";
import cloudinary from "../utils/cloudinaryConfig.js";



export const addExamination = async (req, res) => {
    try {
      const { title, description, time, numberOfQuestions, questions,grade } = req.body;
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
        grade,
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
            return res.json({message:"success",allExaminations})
        }


    }catch(error){
        console.log(error)
        return res.status(500).json({message:"error"})
    }
}

export const getOneExam = async(req,res)=>{
  try{
    const {id} = req.params
    const exam = await examinationModel.findById(id)
    return res.json({exam,success:true})



  }catch(error){
    console.log(error)
  }
}

export const courseFileUpload = async(req, res) => {
  const uploadedFiles = req.files.map((file) => ({
    url: file.path,
    public_id: file.filename,
  }));
  console.log(uploadedFiles)
  const newCourse = new courseSchema({ title: req.body.title, grade:req.body.grade, files : uploadedFiles });
  await newCourse.save();
  res.json({ message: "Files uploaded successfully", files: uploadedFiles });
  // return res.status(201).json({ message: "Course saved successfully", course: newCourse });
}



export const courseVideoUpload = async (req, res) => {
  
  const uploadedFiles = req.files.map((file) => ({
    url: file.path,
    public_id: file.filename,
  }));
  return res.json({ message: "Videos uploaded successfully", files: uploadedFiles });
}







export const courseUpload = async (req, res) => {
  try {
    const { title, modules } = req.body;
    const newCourse = new courseSchema({ title, modules });
    await newCourse.save();
    console.log(modules)
    return res.status(201).json({ message: "Course saved successfully", course: newCourse });
  } catch (error) {
    return res.status(500).json({ message: "Error saving course", error });
  }
};


