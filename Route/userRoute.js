import express from "express"
import { addUser, loginUser, updateUsers,updateAddInvoiceAddOns,loadPurpose, updateAddPaymentAddOns,UpdateMessage, fetchChannelFeed, payAfterInvoice,fetchSingleUser, findAssessment, findCourses, forgotPassword, ResetPassword, FeaturedExams, uploadProfileImage, sendFeedBack,RegisterProgram, verifyRegistration,fetchRegisteredPrograms, fetchFeedback, updateCourseProgress, fetchCourseProgress, updateProfileImage, updateCoverImage} from "../Controllers/userController.js"
import { authenticateUser } from "../Middlewares/authUser.js"
import { channelImageUpload } from "../Middlewares/UploadFile.js"
import { profileImageupload } from "../Middlewares/UploadFile.js"
import { coverImageupload } from "../Middlewares/UploadFile.js"


export const userRoute = express.Router()

userRoute.post("/register-user",addUser)
userRoute.post("/login", loginUser)

userRoute.get("/load-purpose",authenticateUser,loadPurpose)
userRoute.put("/update-user/:id", updateUsers)
userRoute.put("/update-user-details",authenticateUser,updateAddInvoiceAddOns)

userRoute.post("/update-user-payment-details",authenticateUser,updateAddPaymentAddOns)

userRoute.put("/update-pay-after-invoice",authenticateUser,payAfterInvoice)
userRoute.post("/send-message",channelImageUpload.single("image"),UpdateMessage)
// userRoute.post("/upload-picture/:userId",profileImageupload.single("image"),uploadProfileImage)
userRoute.post("/update-profile-picture/:id",profileImageupload.single("image"),updateProfileImage)
userRoute.post("/update-cover-picture/:id",coverImageupload.single("coverImage"),updateCoverImage)
userRoute.get("/channel-feed/:channelId",fetchChannelFeed)
userRoute.get("/user-details/:id",fetchSingleUser)
userRoute.get("/featured-exams",FeaturedExams)

userRoute.get("/assessment/:name/:grade",findAssessment)
userRoute.get("/course/:name/:grade",findCourses)
userRoute.post("/send-password-reset-link",forgotPassword)
userRoute.post("/reset-password",ResetPassword)
userRoute.post("/send-feedback",sendFeedBack)
userRoute.get("/all-feedback",fetchFeedback)


userRoute.post("/register-program", RegisterProgram)
userRoute.get("/verify-registration/:userId/:program",verifyRegistration)
userRoute.get("/fetch-registered-programs/:fullName/:status",fetchRegisteredPrograms)

userRoute.post("/update-course-progress/:id",updateCourseProgress)
userRoute.post("/fetch-course-progress",fetchCourseProgress)





