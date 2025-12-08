import dotenv from "dotenv"
import axios from "axios"


dotenv.config()


export const makePayment = async(req,res)=>{
    try{
        const appId = process.env.MOJOPAY_APP_ID
        const appKey = process.env.MOJOPAY_APP_KEY

        const devEnvironment = "https://dev.cspay.app"

        const {userId } = req.params

        const url = ` https://portal.cs-pay.app/interapi/ProcessPayment`

       const order_id = `USER${userId}-TXN${Date.now()}`;

       const {
        name,
        mobile,
        feetypecode,
        amount,
        order_desc,
        email,
        currency,
        mobile_network
        

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
            order_id,
            email,
            currency,
            mobile_network,
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
        const appId = process.env.MOJOPAY_APP_ID
        const appKey = process.env.MOJOPAY_APP_KEY

        const {orderId} = req.params

        const requestBody = {
            appId,
            appKey,
            orderId
        }


        const response = await axios.post("https://baseurl/Interapi.svc/GetInvoiceStatus",requestBody)

        console.log(response)

        return res.json({success:true,response})



    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}