import { courseSchema } from "../Model/CourseModels.js";
import { courseInfoModel } from "../Model/CourseInfo.js";
import { examinationModel } from "../Model/Examination.js";
import { courseDetailsModel } from "../Model/CourseDetails.js";
import cloudinary from "../utils/cloudinaryConfig.js";
import { uploadToGCS } from "../utils/googleCloudConfig.js";
import { competitionsSchema } from "../Model/Competions.js";



export const addExamination = async (req, res) => {
  try {
    const { title, description, time, programs,tags,features, numberOfQuestions, questions,grade ,featured,publish,attemptsAllowed,allowQuizReview,displayScores,shuffleQuestions,showFeedBackForm} = req.body;
    const parsedQuestions = JSON.parse(questions);
    

    // Get uploaded quiz image URL
    
    const quizImageUrl = req.files?.image ? req.files.image[0]?.path : "";
    

    // Process question images
    let questionImageIndex = 0;
    const processedQuestions = parsedQuestions.map((item) => {
      if (!item.hasImage) {
        return item;
      }
      if (req.files?.questionImages && req.files.questionImages[questionImageIndex]) {
        item.image = req.files.questionImages[questionImageIndex].path; // Cloudinary URL
        questionImageIndex += 1;
      }
      return item;
    });

    // Save to MongoDB
    const newQuiz = new examinationModel({
      title,
      description,
      time,
      grade:JSON.parse(grade),
      numberOfQuestions,
      questions: processedQuestions,
      image: quizImageUrl,
      featured,
      publish,
      attemptsAllowed,
      allowQuizReview,
      displayScores,
      showFeedBackForm,
      shuffleQuestions,
      tags:JSON.parse(tags),
      features:JSON.parse(features),
      programs:JSON.parse(programs),
      
    
    });

    const quizDetails = await newQuiz.save();
    for(let program of JSON.parse(programs)){
      const existingProgram = await competitionsSchema.find({name:program})
      const updateCompetition = await competitionsSchema.findByIdAndUpdate(existingProgram[0]._id,{Assessments:[...existingProgram[0].Assessments,quizDetails._id]},{new:true})
    }

    return res.json({ success: true, message: "Quiz created successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Error creating quiz" ,error:error.message});
  }
};


export const allExam = async(req,res)=>{
    try{
        const allExaminations = await examinationModel.find({publish:true})
        if(allExaminations){
            return res.json({message:"success",allExaminations})
        }


    }catch(error){
        console.log(error)
        return res.status(500).json({message:"error"})
    }
}

export const allExamAdmin = async(req,res)=>{
    try{
        const allExaminations = await examinationModel.find({})
        const examNames = allExaminations.map((item)=>{return {_id:item._id,title:item.title}})
        if(allExaminations){
            return res.json({message:"success",allExaminations:examNames})
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

export const courseInfoUpload= async(req,res)=>{
  try{
    const {title,grade,description,featured,program,category,duration,cost,tags,features, instructor,level}= req.body
  
   console.log(req.body)
    const newCourseInfo = new courseInfoModel({title,grade:JSON.parse(grade),description,publish:featured,thumbnail:req.file.path,program:JSON.parse(program),category:JSON.parse(category),duration,cost,tags:JSON.parse(tags),features:JSON.parse(features),instructor,level})
    const coursedetails = await newCourseInfo.save()

    for(let item of JSON.parse(program)){
      const existingProgram = await competitionsSchema.find({name:item})
      const updateProgramCourse = await competitionsSchema.findByIdAndUpdate(existingProgram[0]._id,{courses:[...existingProgram[0].courses,coursedetails._id]},{new:true})

    }
    return res.json({success:true,id:coursedetails._id})


  }catch(error){
    console.log(error)
    return res.json({success:false,message:"error"})
  }
}

export const courseDetailsUpload= async(req,res)=>{
  try{
    const {courseId}= req.params
    const {title,description,resources} =req.body
    console.log(req.body)
    
    // Safely parse Videos with fallback to empty array
    const Videos = req.body?.Videos ? JSON.parse(req.body?.Videos) : [];
    
    // Safely parse resources with fallback to empty array
    const additionalResources = resources ? JSON.parse(resources) : [];

    console.log(req.body)
    
    // Safely handle files upload with proper checks
    const files = (req.files && req.files["files"]) ? await Promise.all(req.files["files"].map(uploadToGCS)) : [];
    
    // Safely handle image upload with proper checks
    const image = (req.files && req.files["image"] && req.files["image"][0]) ? await uploadToGCS(req.files["image"][0]) : null;

    const newDetails = new courseDetailsModel({title,image,files,Videos,description,courseId,additionalResources})
    await newDetails.save()
    return res.json({success:true})


  }catch(error){
    console.log(error)
    return res.json({success:false,error})
  }
}

export const fetchCourseDetails = async(req,res)=>{
  try{
    const {courseId}= req.params
    const course = await courseDetailsModel.find({courseId})
    return res.json({success:true,course})



  }catch(error){
    consle.log(error)
    return res.json({success:false})
  }
}

export const fetchCourseInfo = async(req,res)=>{
  try{
    const {id}= req.params
    const courseInfo = await courseInfoModel.findById(id)
    return res.json({success:true,courseInfo})


  }catch(error){
    console.log(error)
  }
}

export const updateCourseInfo = async(req,res)=>{
  try{
    const {id}= req.params
    const update = req.body
    if(req.body["thumbanil"]){
      const newUpdate= await courseInfoModel.findByIdAndUpdate(id,{thumbnail:req.file.path},{new:true})
      return res.json({success:true,message:"update successful",newUpdate})

      
    }
    const newUpdate= await courseInfoModel.findByIdAndUpdate(id,update,{new:true})
    return res.json({success:true,message:"update successful",newUpdate})



  }catch(error){
    console.log(error)
  }
}
export const deleteCourseModule = async(req,res)=>{
  try{
    const {id}= req.params
    await courseDetailsModel.findByIdAndDelete(id)
    return res.json({success:true,message:"module deleted successfully"})



  }catch(error){
    console.log(error)
  }
}
export const updateCourseModule = async(req,res)=>{
  try{
    const {id}= req.params
    if(req.body["files"]){
      const files = req.files["files"] ? await Promise.all(req.files["files"].map(uploadToGCS)) : [];
    
      const update = await courseDetailsModel.findByIdAndUpdate(id,{files},{new:true})
      return res.json({success:true,update})
    }
    if(req.body["image"]){
      const image = req.files["image"] ? await uploadToGCS(req.files["image"][0]) : null;

      const update = await courseDetailsModel.findByIdAndUpdate(id,{image},{new:true})

      return res.json({success:true,update})


    }
    const update = await courseDetailsModel.findByIdAndUpdate(id,req.body,{new:true})
    return res.json({success:true,update})




  }catch(error){
    console.log(error)
  }
}

export const updateCourseDetails = async(req,res)=>{
  try{
    const {id}= req.params
    const files = req.files["files"] ? await Promise.all(req.files["files"].map(uploadToGCS)) : [];
    const image = req.files["image"] ? await uploadToGCS(req.files["image"][0]) : null;
    
    const course = await courseDetailsModel.findByIdAndUpdate(id,{...req.body,image,files},{new:true})
    return res.json({success:true,course})



  }catch(error){
    consle.log(error)
    return res.json({success:false})
  }
}


export const allCourses = async(req,res)=>{
  try{
    const courses = await courseInfoModel.find({publish:true})
    return res.json({successs:true, courses})



  }catch(error){
    console.log(error)
  }
}

export const allCoursesInfo = async(req,res)=>{
  try{
    const courses = await courseInfoModel.find({publish:true})
    return res.json({successs:true, courses})



  }catch(error){
    console.log(error)
  }
}
export const allCoursesAdminInfo = async(req,res)=>{
  try{
    const courses = await courseInfoModel.find({})
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

// export const updateCourseDetails = async(req,res)=>{
//   try{
//     const {id}= req.params

//     if(Object.keys(req.body)!==0){
//       console.log(req.body)
//       const courseDetails = await courseSchema.findByIdAndUpdate(id,req.body,{new:true})
//       return res.json({success:true, courseDetails})
//     }




//   }catch(error){
//     console.log(error)
//   }
// }

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

export const updateQuestion = async(req,res)=>{
  try{
    const {id, questionIndex}=req.params
    const details = await examinationModel.findById(id)
    if(!req.file){
      const updatedQuestion = details.questions.map((item,index)=>questionIndex==index?req.body:item)
      const updateQuestions = await examinationModel.findByIdAndUpdate(id,{questions:updatedQuestion},{new:true})
      return res.json({success:true,updateQuestions})
    }
     const updatedQuestion = details.questions.map((item,index)=>questionIndex==index?{...req.body,image:req.file.path}:item)
     const updateQuestions = await examinationModel.findByIdAndUpdate(id,{questions:updatedQuestion},{new:true})
     return res.json({success:true,updateQuestions})
    


  }catch(error){
    console.log(error)
  }
}

export const deleteExam = async(req,res)=>{
  try{
    const {id}= req.params
    const deletExam = await examinationModel.findByIdAndDelete(id)
    return res.json({success:true})


  }catch(error){
    console.log(error)
  }
}



export const addQuestion = async(req,res)=>{
  try{
    const {id}= req.params
    const examination = await examinationModel.findById(id)
    const update = [...examination.questions,{...req.body,image:req.file?req.file.path:null}]
    const updateQuestions = await examinationModel.findByIdAndUpdate(id,{questions:update},{new:true})
    return res.json({success:true,update:updateQuestions})
  }catch(error){
    console.log(error)
  }
}



