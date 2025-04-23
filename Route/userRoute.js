import express from "express"
import { addUser, loginUser, updateUsers,updateAddInvoiceAddOns,loadPurpose, updateAddPaymentAddOns,UpdateMessage, fetchChannelFeed, payAfterInvoice,fetchSingleUser} from "../Controllers/userController.js"
import { authenticateUser } from "../Middlewares/authUser.js"
import { channelImageUpload } from "../Middlewares/UploadFile.js"

export const userRoute = express.Router()

userRoute.post("/register-user",addUser)
userRoute.post("/login", loginUser)

userRoute.get("/load-purpose",authenticateUser,loadPurpose)
userRoute.put("/update-user/:id", updateUsers)
userRoute.put("/update-user-details/:id",authenticateUser,updateAddInvoiceAddOns)
userRoute.post("/update-user-payment-details/:id",authenticateUser,updateAddPaymentAddOns)
userRoute.post("/update-pay-after-invoice",authenticateUser,payAfterInvoice)
userRoute.post("/send-message",channelImageUpload.single("image"),UpdateMessage)
userRoute.get("/channel-feed/:channelId",fetchChannelFeed)
userRoute.get("/user-details/:id",fetchSingleUser)




