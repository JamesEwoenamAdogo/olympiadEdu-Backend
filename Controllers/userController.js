import { userModel } from "../Model/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import dotenv from "dotenv"
import { competitionsSchema } from "../Model/Competions.js";
import { transactionModel } from "../Model/transactionModel.js";
import { courseSchema } from "../Model/CourseModels.js";
import { examinationModel } from "../Model/Examination.js";
import { channelFeedModel } from "../Model/ChannelFeed.js";
import { RegisterId } from "../Middlewares/Utilities.js";

dotenv.config()




export const addUser = async(req,res)=>{
    try{
        const {firstName, lastName,DOB,email,password,mobileNumber,category,educationalLevel,grade,purposeOfRegistration,gender,School,country,PWD}= req.body
        console.log(firstName,lastName,DOB, email,password,mobileNumber,category,educationalLevel,grade,country,School,gender,purposeOfRegistration,PWD)
        const existingUser = await userModel.find({email})
        const allCompetitions = await competitionsSchema.find({})
        const exsitingUserByPhoneNumber = await userModel.find({mobileNumber})
        
        
        if(existingUser.length==1) {
            console.log(existingUser)
            return res.json({success:false,message:"User email already registered"})
        }
        if(exsitingUserByPhoneNumber.length==1){
            return res.json({success:false,message:"Phone Number already registered"})
        }

        // let userExams= []
        // for(let exam of purposeOfRegistration){
        //     let examinations = allCompetitions.filter((item)=>{return item.name == exam})
        //     userExams.push(...examinations)

        // }
        const hashedPassword = await bcrypt.hash(password,10)
        const userName = email.split("@")[0]+ Math.ceil(Math.random()*1000000)
        const newUser= new userModel({firstName,lastName,DOB,email,password:hashedPassword,mobileNumber,Category:category,educationalLevel,grade,purposeOfRegistration,userName,gender,School,country,PWD})
        
        console.log(newUser)
        newUser.save()

        const date = new Date().toISOString().split("T")[0]
        
        const token = jwt.sign({id:newUser._id,firstName:newUser.firstName, lastName:newUser.lastName,userName:newUser.userName,Registered:newUser.Registered,Paid:newUser.Paid, Invoice:newUser.Invoice,AddOns:newUser.AddOns,category:newUser.Category,mobile: newUser.mobileNumber, location: newUser.country, joined: date},process.env.TOKEN_SECRET, {expiresIn:"1d"})
       
        return res.json({success:true, message:"User Created successfully",token,userName,purposeOfRegistration})







    }catch(error){
        console.log(error)
        return res.status(500).json({success:false})
    }





}



export const loginUser = async(req,res)=>{
    try{
        if(req.body['email']){
            const checkExisting = await userModel.find({email:req.body.email})
            if(checkExisting.length==0){
                return res.json({success:false,message:"User not found"})

            }
            const comparePassword = bcrypt.compare(checkExisting[0].password,req.body.password)
            if(!comparePassword){
                return res.json({success:false,message:"Invalid credentials"})
            }
            const token = jwt.sign({id:checkExisting[0]._id,userName:checkExisting[0].userName,firstName:checkExisting[0].firstName, lastName:checkExisting[0].lastName,Registered:checkExisting[0].Registered,Paid:checkExisting[0].Paid, Invoice:checkExisting[0].Invoice,category:checkExisting[0].Category, mobile: checkExisting[0].mobileNumber , location:checkExisting[0].country, joined:checkExisting[0].createdAt},process.env.TOKEN_SECRET, {expiresIn:"1d"})
            return res.json({success:true,token,message:"User Logged In successfully",purpose_Of_Registration:checkExisting[0].purposeOfRegistration})
        }

        if(req.body['userName']){
            const checkExisting = await userModel.find({userName:req.body.userName})
            if(!checkExisting.length==0){
                return res.json({success:false,message:"User not found"})

            }
            const comparePassword = bcrypt.compare(checkExisting[0].password,req.body.password)
            if(!comparePassword){
                return res.json({success:false,message:"Invalid credentials"})
            }
            const token = jwt.sign({id:checkExisting[0]._id,userName:checkExisting[0].userName,firstName:checkExisting[0].firstName, lastName:checkExisting[0].lastName,Registered:checkExisting[0].Registered,Paid:checkExisting[0].Paid, Invoice:checkExisting[0].Invoice,category:checkExisting[0].Category, mobile: checkExisting[0].mobileNumber, location: checkExisting[0].country, joined: checkExisting[0].createdAt},process.env.MONGO_SECRET, {expiresIn:"1d"})
            return res.json({success:true,token,message:"User Logged In successfully",purpose_Of_Registration:checkExisting[0].purposeOfRegistration})
        }



    }catch(error){
        console.log(error)
        return res.status(500).json({success:false})
    }
}
export const updateAddInvoiceAddOns = async(req,res)=>{
    try{
        const {Registered,Invoice,AddOns,Paid,choice,Grade}= req.body
        const userId = req.userId
        // const {id} = req.params
        
       
        const userDetails = await userModel.findById(userId)
        // const allCompetitions = await competitionsSchema.findById(id)
        // const subCompetition = allCompetitions
        const date = new Date()

        console.log(req.body)

        console.log(userDetails,req.body)
        const registered = userDetails.Registered
        const invoice = userDetails.Invoice
        const addOns = userDetails.AddOns

        // const checkPaidAlready = userDetails.Paid.find((item)=>{return item == Paid })
        
        // if(checkPaidAlready){
        //     return res.json({success:false, message:"payment already made for this examination"})
        // }
        
        const checkExistingInvoice = userDetails.Invoice.find((item)=>{return item.name == Registered && item.grade==Grade})
        
        if(checkExistingInvoice){
            return res.json({success:false,message:"Invoice already added"})
        }
        const updatedwithoutPaid = await userModel.findByIdAndUpdate(userId,{Registered:[...registered, Registered],Invoice:[...invoice,Invoice]}, {new:true})

        // const otherSub = subCompetition.subTypes.filter((item)=>{return !(item.name==Registered)})
        // const currentSub = subCompetition.subTypes.find((item)=>{return item.name==Registered})
        // let paid = []
        // if(Paid){
        //     paid = userDetails.Paid
        //     const updatedwithPaid = await userModel.findByIdAndUpdate(userId,{Registered:[...registered, Registered],Invoice:[...invoice,Invoice],AddOns:[...addOns,AddOns],Paid:[...paid, Paid]}, {new:true})
        
        //     const subUpdate = {...currentSub,paid:currentSub.paid+1,registered:currentSub.registered+1}

        //     const transactionObject = {name:userDetails.userName,amount:Invoice.Cost,description:Invoice.name,status:"Paid",generatedOn:`${date.getMonth()+1} ${date.getFullYear()}`,paidOn:"--"}
            
        //     const transaction = new transactionModel(transactionObject)
        //     transaction.save()

        //     const updatePaid = await competitionsSchema.findByIdAndUpdate(subCompetition._id,{subTypes:[...otherSub,subUpdate]},{new:true})
        //     return res.json({success:true })
        // }
        
        // const subUpdate = {...currentSub,registered:currentSub.registered+1}

        // const updatePaid = await competitionsSchema.findByIdAndUpdate(subCompetition._id,{subTypes:[...otherSub,subUpdate]},{new:true})
        const course = await courseSchema.find({title:Registered,grade:Grade})
        const assessment = await examinationModel.find({title:Registered,grade:Grade})

        if(!choice.assessment&&!choice.course) return res.json({sucess:true,message:"Registration completed"})

        if(choice.assessment&&!choice.course&&assessment.length==0){
            
            return res.json({success:false, message:`Assessment for ${Registered} grade ${Grade} does not exist`})
        }
        if(choice.course&&!choice.assessment&&course.length==0){
            return res.json({success:false, message:`Courses for ${Registered} grade ${Grade} does not exist`})
        }
        if(choice.course&&choice.assessment&&course.length==0&&assessment.length==0){
            return res.json({success:false,message:`Courses and assessment for ${Registered} grade ${Grade} does not exist`})
        }
        if(choice.course&&choice.assessment&&course.length==0&&assessment.length!==0){
            return res.json({success:false,message:`Assessment for ${Registered} grade ${Grade} does not exist`})
        }
        if(choice.course&&choice.assessment&&course.length!==0&&assessment.length==0){
            return res.json({success:false,message:`Courses for ${Registered} grade ${Grade} does not exist`})
        }

        
        const transactionBody = {name:userDetails.userName,amount:Invoice.Cost,description:Invoice.name,status:"Pending",generatedOn:`${date.getMonth()+1} ${date.getFullYear()}`,paidOn:"--"}
        const transaction = new transactionModel(transactionBody)
        transaction.save()
       
        return res.json({success:true})


    }catch(error){
        console.log(error)
        res.status(500).json({message:"error",})
    }
}
export const updateAddPaymentAddOns = async(req,res)=>{
   try{
    const {Registered,Invoice,AddOns,Paid,choice,Grade}= req.body
    

    const user = await userModel.findById(req.userId)
    
   
    const updateUser = await userModel.findByIdAndUpdate(user._id,{Paid:[...user.Paid,Invoice]},{new:true})
    const date = new Date()
    const transactionBody = {name:user.userName,amount:Invoice.Cost,description:Invoice.name,status:"Paid",generatedOn:`${date.getMonth()+1} ${date.getFullYear()}`,paidOn:"--"}
    const newTransaction = new transactionModel(transactionBody)
    newTransaction.save()

    

   




    console.log(req.body)
    if(!choice.assessment&&!choice.course) return res.json({sucess:true,message:"Registration completed"})

    if(choice.assessment && choice.course)
    {
    
    const course = await courseSchema.find({title:Registered,grade:Grade})
    console.log(course)
    const assessment = await examinationModel.find({title:Registered,grade:Grade})
    console.log(assessment)

    
    if(assessment.length==0 && course.length==0){
        return res.json({success:false,message:`Assessment and Course for grade ${Grade} ${Registered} does not exist`})
    }
    if(assessment.length==0){
        return res.json({success:false,message:`Assessment for grade ${Grade} ${Registered} does not exist`})
    }
    if(course.length==0){
        return res.json({success:false,message:`Course for grade ${Grade} ${Registered} does not exist`})
    }
    
    const courseRegistered = course[0].registered
    const assessmentRegistered = assessment[0].registered

    for(let id of courseRegistered){
        if(id==req.userId){
            return res.json({success:false,message:"User already registered"})
        }
    }
    
    for(let id of assessmentRegistered){
        if(id==req.userId){
            return res.json({success:false,message:"User already registered"})
        }
    }
    
    RegisterId(req.body.id,Registered,req.userId)
    const updateCourse = await courseSchema.findByIdAndUpdate(course[0]._id,{registered:[...courseRegistered,req.userId]})
    const assessmentUpdate = await examinationModel.findByIdAndUpdate(assessment[0]._id,{registered:[...assessmentRegistered,req.userId]},{new:true})
    return res.json({success:true,message:"success"})
    }
    else if(choice.assessment && !choice.course){
        const assessment = await examinationModel.find({title:Registered,grade:Grade})
        if(assessment.length==0){
            return res.json({success:false,message:`Assessment for grade ${Grade} ${Registered} does not exist`})
        }
        const assessmentRegistered = assessment[0].registered
        for(let id of assessmentRegistered){
            if(id==req.userId){
                return res.json({success:false,message:"User already registered"})
            }
        }
        
        RegisterId(req.body.id,Registered)

        const assessmentCourse = await examinationModel.findByIdAndUpdate(assessment[0]._id,{registered:[...assessmentRegistered,req.userId]},{new:true})
        return res.json({success:true,message:"success"})
    
    }
    else if(!choice.assessment && choice.course){
        const course = await courseSchema.find({title:Registered,grade:Grade})
        const courseRegistered = course[0].registered
        if(course.length==0){
            return res.json({success:false,message:`Course for grade ${Grade} ${Registered} does not exist`})
        }
        for(let id of courseRegistered){
            if(id==req.userId){
                return res.json({success:false,message:"User already registered"})
            }
        }
        RegisterId(req.body.id,Registered)
        
        const updateCourse = await courseSchema.findByIdAndUpdate(course[0]._id,{registered:[...courseRegistered,req.userId]},{new:true})

        return res.json({success:true,message:"success"})

    
    }


    }catch(error){
        console.log(error)
        res.status(500).json({message:"error",})
    }
}

export const fetchUsers = async(req,res)=>{
    try{
        const allUsers = await userModel.find({})
        res.json({success:true, user:allUsers})

        
        



    }catch(error){
        console.log(error)
        res.status(500).json({message:"Error",success:false})
    }
}
export const fetchSingleUser = async(req,res)=>{
    try{
        const {id}= req.params
        const user = await userModel.findById(id)
        res.json({success:true, user})

        
        



    }catch(error){
        console.log(error)
        res.status(500).json({message:"Error",success:false})
    }
}


export const updateUsers = async(req,res)=>{
    try{
        const {id} = req.params
        const updateBody = req.body
        if(updateBody["editingField"]){
            const user = await userModel.findById(id)
            console.log(updateBody)
            const comparePasswords = bcrypt.compare(user.password,updateBody.oldPassword)
            console.log(comparePasswords)
            if(!comparePasswords){
                return res.json({success:false, message:"The old password you entered is incorrect"})


            }
            const newPassword = await bcrypt.hash(updateBody.newPassword,10)
            const passwordField = {password: newPassword}
            const update = await userModel.findByIdAndUpdate(id,passwordField,{new:true})
            return res.json({success:true, message:"Pasword Updated"})



        }
        console.log(updateBody)
        console.log(id)
        const updateUser = await userModel.findByIdAndUpdate(id,updateBody,{new:true})
        console.log(updateUser)
        if(!updateUser){
            return res.json({succes:false,message:"Success"})
        }
        return res.json({success:true,message:"Success"})
        




    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Error"})
    }
}

export const loadPurpose = async(req,res)=>{
    try{
        const id = req.userId
        const userDetail = await userModel.findById(id)
        // const allCompetitions = await competitionsSchema.find({})
        console.log(userDetail)
        
        // let userExams = []
        // for(let exam of userDetail.purposeOfRegistration){ 
            
        //     let examinations = allCompetitions.filter((item)=>{return item.name ==exam.name})
        //     userExams.push(...examinations)

        // }
        // console.log(userDetail)
        
        // const userDetail = await userModel.findByIdAndUpdate(id,{purposeOfRegistration:userDetails},{new:true})
        // console.log(updatedPurpose)
        // console.log(userExams)
        return res.json({success:true, purpose_Of_Registration:userDetail.purposeOfRegistration,Invoice:userDetail.Invoice,Paid:userDetail.Paid,AddOns:userDetail.AddOns})

        
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"error"})
    }


    
}

export const payAfterInvoice = async(req,res)=>{
    try{
        const {Invoice,choice}=  req.body
        const userId = req.userId
        const userDetails = await userModel.findById(userId)
        const invoicePayed = userDetails.Invoice.find((item)=>{return item.name==Invoice.name && item.grade==Invoice.grade})
        const invoiceAfterPayment = userDetails.Invoice.filter((item)=>{return !(item.name==Invoice.name && item.grade==Invoice.grade)})
        const payedItems = [...userDetails.Paid,invoicePayed]
        const updated = await userModel.findByIdAndUpdate(req.userId,{Paid:payedItems,Invoice:invoiceAfterPayment}, {new:true})

        const date = new Date()
        const transactionBody = {name:userDetails.userName,amount:Invoice.Cost,description:Invoice.name,status:"Paid",generatedOn:`${date.getMonth()+1} ${date.getFullYear()}`,paidOn:"--"}
        const newTransaction = new transactionModel(transactionBody)
        newTransaction.save()

        
        // const competition = await competitionsSchema.findById(req.body.id)
        // const SubTypes = competition.subTypes

        // const competitionSubType = competition.subTypes.find((item)=> item.name==Invoice.name)
        // const registered = [...competitionSubType.registered,req.userId]

        // const subTypes = SubTypes.map((item)=>{
        //     if(item.name==Invoice.name){
        //         return {...item,registered}
        //     }
        //     return item
        // })

        // const updateCompetition = await competitionsSchema.findByIdAndUpdate(req.body.id,{subTypes}, {new:true})

        if(!choice.assessment&&!choice.course) return res.json({sucess:true,message:"Registration completed"})

        if(choice.assessment && choice.course)
            {
            
            const course = await courseSchema.find({title:Invoice.name,grade:Invoice.grade})
            console.log(course)
            const courseRegistered = course[0].registered
            const assessment = await examinationModel.find({title:Invoice.name,grade:Invoice.grade})
            console.log(assessment)
            const assessmentRegistered = assessment[0].registered
        
            if(assessment.length==0 && course.length==0){
                return res.json({success:false,message:`Assessment and Course for grade ${Invoice.grade} ${Invoice.name} does not exist`})
            }
            if(assessment.length==0){
                return res.json({success:false,message:`Assessment for grade ${Invoice.grade} ${Invoice.name} does not exist`})
            }
            if(course.length==0){
                return res.json({success:false,message:`Course for grade ${Invoice.grade} ${Invoice.name} does not exist`})
            }
        
            for(let id of courseRegistered){
                if(id==req.userId){
                    return res.json({success:false,message:"User already registered"})
                }
            }
            
            for(let id of assessmentRegistered){
                if(id==req.userId){
                    return res.json({success:false,message:"User already registered"})
                }
            }
            
            RegisterId(req.body.id,Invoice.name)
            
            const updateCourse = await courseSchema.findByIdAndUpdate(course[0]._id,{registered:[...courseRegistered,req.userId]})
            const assessmentUpdate = await examinationModel.findByIdAndUpdate(assessment[0]._id,{registered:[...assessmentRegistered,req.userId]},{new:true})
            return res.json({success:true,message:"success"})
            }

            else if(choice.assessment && !choice.course)
            {
                const assessment = await examinationModel.find({title:Invoice.name,grade:Invoice.grade})
                if(assessment.length==0){
                    return res.json({success:false,message:`Assessment for grade ${Invoice.grade} ${Invoice.name} does not exist`})
                }
                const assessmentRegistered = assessment[0].registered
                for(let id of assessmentRegistered){
                    if(id==req.userId){
                        return res.json({success:false,message:"User already registered"})
                    }
                }
                
                RegisterId(req.body.id,Invoice.name)
                
                const assessmentCourse = await examinationModel.findByIdAndUpdate(assessment[0]._id,{registered:[...assessmentRegistered,req.userId]},{new:true})
                return res.json({success:true,message:"success"})
            
            }

            else if(!choice.assessment && choice.course)
            {
                const course = await courseSchema.find({title:Invoice.name,grade:Invoice.grade})
                const courseRegistered = course[0].registered
                if(course.length==0){
                    return res.json({success:false,message:`Course for grade ${Invoice.grade} ${Invoice.name} does not exist`})
                }
                for(let id of courseRegistered){
                    if(id==req.userId){
                        return res.json({success:false,message:"User already registered"})
                    }
                }
                RegisterId(req.body.id,Invoice.name)
                
                const updateCourse = await courseSchema.findByIdAndUpdate(course[0]._id,{registered:[...courseRegistered,req.userId]},{new:true})
                // const newInvoice = userDetails.Invoice.filter((item)=>{return item.name!= })
                return res.json({success:true,message:"success"})
            }
        




    }catch(error){
        console.log(error)
        res.status(500).json({success:false})
    }

}

export const UpdateMessage = async(req,res) =>{
    try{
        const {channelId,sender,content,}= req.body
        console.log(req.body)
        const message = {sender,content}
        
        console.log(message)
        
        const existing = await channelFeedModel.find({channelId})
        if(existing.length==1){
            const existingMessages = existing[0].messages
            const newIncomingMessages = {...message,attachment: req.file? req.file.path : null}
            const finalNewMessage = [...existingMessages, newIncomingMessages]
            const updateMessages = await channelFeedModel.findByIdAndUpdate(existing[0]._id,{messages:finalNewMessage},{new:true})
            return res.json({success:true,message:"completed successfully"})
          

        }
        const newMessageList = [{...message,attachment:req.file? req.file.path:null}]
        const newMessage = new channelFeedModel({channelId,messages:newMessageList})
        newMessage.save()
        return res.json({success:true,newMessage})
        
        
    }catch(error){
        console.log(error)
    }
}

export const fetchChannelFeed = async(req,res)=>{
    try{
        const {channelId} = req.params
        const channelFeed = await channelFeedModel.find({channelId})
        return res.json({success:true,channelFeed})


    }catch(error){
        console.log(error)
    }
}

