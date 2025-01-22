import express from "express"
import { paidForUsers, registeredForUsers,addCompetition,AllCompetitions,deleteCompetition,updateCompetition,findOneCompetion } from "../Controllers/adminController.js"
import { authenticateUser } from "../Middlewares/authUser.js"
import { fetchUsers } from "../Controllers/userController.js"


export const adminRoutes = express.Router()
adminRoutes.get("/registered-for/:name", authenticateUser ,registeredForUsers)
adminRoutes.get("/paid-for/:name", authenticateUser , paidForUsers)
adminRoutes.get("/all-users", fetchUsers)

adminRoutes.post("/add-competition",authenticateUser,addCompetition)
adminRoutes.get("/all-competitions",authenticateUser,AllCompetitions)
adminRoutes.delete("/delete-competition/:id",authenticateUser, deleteCompetition)
adminRoutes.put("/update-competition/:id", authenticateUser,updateCompetition)
adminRoutes.get("/all-competition", authenticateUser,AllCompetitions)
adminRoutes.get("/competition/:id",authenticateUser,findOneCompetion)
