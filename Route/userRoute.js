import express from "express"
import { addUser, loginUser, updateUsers,updateAddInvoiceAddOns} from "../Controllers/userController.js"
import { authenticateUser } from "../Middlewares/authUser.js"

export const userRoute = express.Router()

userRoute.post("/register-user",addUser)
userRoute.post("/login", loginUser)
userRoute.put("/update-user",authenticateUser, updateUsers)
userRoute.post("/update-user-details",authenticateUser,updateAddInvoiceAddOns)




