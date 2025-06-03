import { courseSchema } from "../Model/CourseModels.js";
import { examinationModel } from "../Model/Examination.js";
import cloudinary from "../utils/cloudinaryConfig.js";
import { uploadToGCS } from "../utils/googleCloudConfig.js";



export const addExamination = async (req, res) => {
    try {
      const { title, description, time, numberOfQuestions, questions,grade ,featured} = req.body;
      const parsedQuestions = questions;
  
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
        featured
      });
  
      await newQuiz.save();
      return res.json({ success: true, message: "Quiz created successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Error creating quiz" ,error:error.message});
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
export const updateOneExam = async(req,res)=>{
  try{
    const {id} = req.params
    // console.log(req.body.image)
    console.log(req.file)
    if(!req.file){
      const exam = await examinationModel.findByIdAndUpdate(id,req.body,{new:true})
      return res.json({exam,success:true})
  
    }
    const image = {image: req.file.path}
    console.log(image)
    const exam = await examinationModel.findByIdAndUpdate(id,image,{new:true})
    return res.json({exam,success:true})
  


  }catch(error){
    console.log(error)
  }
}

export const courseFileUpload = async(req, res) => {
  // const uploadedFiles = req.files.map((file) => ({
  //   url: file.path,
  //   public_id: file.filename,
  // }));
  // console.log(uploadedFiles)
  // const newCourse = new courseSchema({ title: req.body.title, grade:req.body.grade, files : uploadedFiles });
  // await newCourse.save();
  // res.json({ message: "Files uploaded successfully", files: uploadedFiles });
  try {
    const { title, grade,description ,featured, tags,category,level, duration } = req.body;
    const files = req.files["files"] ? await Promise.all(req.files["files"].map(uploadToGCS)) : [];
    const thumbnail = req.files["thumbnail"] ? await uploadToGCS(req.files["thumbnail"][0]) : null;

    // Save to MongoDB
    const course = new courseSchema({ title, grade, files, image:thumbnail,tags,level,duration,featured,description, category });
    await course.save();

    res.json({ message: "Course uploaded successfully!", course });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload course" });
  }
 
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


export const allCourses = async(req,res)=>{
  try{
    const courses = await courseSchema.find({})
    return res.json({successs:true, courses})



  }catch(error){
    console.log(error)
  }
}

export const course = async(req,res)=>{
  try{
    const {id} = req.params
    const courseDetails = await courseSchema.findById(id)
    return res.json({success:true, courseDetails})


  }catch(error){
    console.log(error)
  }
}
export const updateCourseThumbnail = async(req,res)=>{
  try{
    const {id} = req.params
    console.log(req.body)
   

  
    if(req.files["thumbnail"]){
      const thumbnail = req.files["thumbnail"] ? await uploadToGCS(req.files["thumbnail"][0]) : null;
      console.log(req.files.thumbnail)
      const courseDetails = await courseSchema.findByIdAndUpdate(id,{image: thumbnail},{new:true})
      return res.json({success:true, courseDetails})

    }

  }catch(error){
    console.log(error)
  }
}

export const updateCourseDetails = async(req,res)=>{
  try{
    const {id}= req.params

    if(Object.keys(req.body)!==0){
      console.log(req.body)
      const courseDetails = await courseSchema.findByIdAndUpdate(id,req.body,{new:true})
      return res.json({success:true, courseDetails})
    }




  }catch(error){
    console.log(error)
  }
}

export const updateCourseFiles = async(req,res)=>{
  try{
    const {id}= req.params
    const details = await courseSchema.findById(id)
    

    if(req.files["files"]){
      const files = req.files["files"] ? await Promise.all(req.files["files"].map(uploadToGCS)) : [];
      

      const courseDetails = await courseSchema.findByIdAndUpdate(id,{files:[...details.files,files[0]]},{new:true})
      console.log(req.files)

      return res.json({success:true, courseDetails})

    }


  }catch(error){
    console.log(error)
  }
}
export const updateCourseFilesAfterDelete = async(req,res)=>{
  try{
    const {id}= req.params
    const details = await courseSchema.findById(id)
    

    if(req.files["files"]){
      const files = req.files["files"] ? await Promise.all(req.files["files"].map(uploadToGCS)) : [];
      

      const courseDetails = await courseSchema.findByIdAndUpdate(id,{files},{new:true})
      console.log(req.files)

      return res.json({success:true, courseDetails})

    }


  }catch(error){
    console.log(error)
  }
}