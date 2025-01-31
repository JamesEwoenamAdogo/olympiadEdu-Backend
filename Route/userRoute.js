import express from "express"
import { addUser, loginUser, updateUsers,updateAddInvoiceAddOns,loadPurpose} from "../Controllers/userController.js"
import { authenticateUser } from "../Middlewares/authUser.js"

export const userRoute = express.Router()

userRoute.post("/register-user",addUser)
userRoute.post("/login", loginUser)

userRoutes.get("/load-purpose",authenticateUser,loadPurposes)
userRoute.put("/update-user",authenticateUser, updateUsers)
userRoute.post("/update-user-details",authenticateUser,updateAddInvoiceAddOns)




