import { competitionsSchema } from "../Model/Competions.js"
import nodeMailer from "nodemailer"
import dotenv from "dotenv"
import axios from "axios"

dotenv.config()
 
export const RegisterId = async(id,Registered,userId)=>{
    const competition = await competitionsSchema.findById(id)
    console.log(id)
    const SubTypes = competition.subTypes

    const competitionSubType = competition.subTypes.find((item)=> item.name==Registered)
    const registered = [...competitionSubType.registered,userId]

    const subTypes = SubTypes.map((item)=>{
        if(item.name==Registered){
            return {...item,registered}
        }
        return item
    })

    const updateCompetition = await competitionsSchema.findByIdAndUpdate(id,{subTypes}, {new:true})
    
}

export const sendPasswordResetLink = async(email,token)=>{
    try{
        const transporter = nodeMailer.createTransport({
            service:"Gmail",
            auth:{
                user:"giftededtech@gmail.com",
                pass:"wyvq oing fwlu apri"
            }
        })
        const resetLink = `https://www.giftededu.tech/reset-password/${token}`
        const result = await transporter.sendMail({
        to: email,
        subject: " Gifted Platform Reset Your Password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
        });
        return result

        



    }catch(error){
        console.log(error)
    }
}


export const sendPasswordandUserName = async(email,password,userName)=>{
    try{
        const transporter = nodeMailer.createTransport({
            service:"Gmail",
            auth:{
                user:"giftededtech@gmail.com",
                pass:"wyvq oing fwlu apri"
            }
        })
        // const resetLink = `https://www.giftededu.tech/reset-password/${token}`
        const result = await transporter.sendMail({
        to: email,
        subject: " Gifted Platform Sign Up",
        html: `<p> Your Gifted username is ${userName} and your password is ${password} Kindly login and change your password`,
        });
        return result

        



    }catch(error){
        console.log(error)
    }
}

export const makePayment = async(req,res)=>{
    try{
        const appId = process.env.MOJOPAY_APP_ID
        const appKey = process.env.MOJOPAY_APP_KEY

        const devEnvironment = "https://dev.cspay.app"

        const {userId } = req.params

        const url = `${devEnvironment}/interapi/Process/Payment`

       const order_id = `USER${userId}-TXN${Date.now()}`;

       const {
        name,
        mobile,
        feetypecode,
        amount,
        order_desc,

       } = req.body


        const paymentBody = {
            app_Id:appId,
            app_key:appKey,
            name,
            mobile,
            feetypecode,
            amount,
            currency:"GHS",
            order_desc,
            order_id
            
        }

        const response = await axios.post(url, paymentBody)
        console.log(response)
        return res.json({data:response.data})






    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}

