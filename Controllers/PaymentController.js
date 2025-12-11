import dotenv from "dotenv"
import axios from "axios"


import { courseInfoModel } from "../Model/CourseInfo.js"

dotenv.config()


export const makePayment = async(req,res)=>{
    try{
        const appId = process.env.MOJOPAY_APP_ID
        const appKey = process.env.MOJOPAY_APP_KEY

        const devEnvironment = "https://dev.cspay.app"

        const {userId } = req.params

        const url = ` https://portal.cs-pay.app/interapi/ProcessPayment`

        
        const {
            name,
            mobile,
            feetypecode,
            amount,
            order_desc,
            email,
            currency,
            // mobile_network
            

        } = req.body
        
        const order_id = `${userId}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;


        const paymentBody = {
            app_id:appId,
            app_key:appKey,
            name,
            mobile,
            feetypecode,
            amount,
            currency:"GHS",
            order_desc,
            order_id,
            email,
            currency,
            // mobile_network,
            return_url:"https://webhook.site/46ab2302-f14d-4b9b-8205-3cb14a80fd3f"
            
        }

        const response = await axios.post(url, paymentBody)
        console.log(response)
        return res.json({data:response.data})






    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}


export const verifyPayment = async(req,res)=>{
    try{
        const app_id = process.env.MOJOPAY_APP_ID
        const app_key = process.env.MOJOPAY_APP_KEY

        // const {order_id} = req.params

        const {courseId, userId,ref}= req.body

        const requestBody = {
            app_id,
            app_key,
            order_id:ref
        }


        const response = await axios.post("https://portal.cs-pay.app/Interapi.svc/GetInvoiceStatus",requestBody)

        console.log(response)

        if(response.data.status==1){
            const course = await courseInfoModel.findById(userId)

            const registered = course.registered

            const existing = registered.find(item => item==userId)

            if(!existing){
                const updatedRegisteredUsers = [...registered,userId]

                const update = await courserInfo(courseId,{registered:updatedRegistedUsers},{new:true})

                
            }
        }

        return res.json({success:true,response})



    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}