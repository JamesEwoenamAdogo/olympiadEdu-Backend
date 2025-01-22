import express from "express"
import { addUser, loginUser } from "../Controllers/userController.js"

export const userRoute = express.Router()

userRoute.post("/register-user",addUser)
userRoute.post("/login", loginUser)



