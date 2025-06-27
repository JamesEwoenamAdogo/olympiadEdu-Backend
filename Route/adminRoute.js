import express from "express"
import { paidForUsers, registeredForUsers,addCompetition,AllCompetitions,deleteCompetition,updateCompetition,findOneCompetion, LoginUser, adminSignUp, fetchTransactions, createGroup, getAllGroups, AddInterest, fetchAllInterests, deleteCourse } from "../Controllers/adminController.js"
import { authenticateUser } from "../Middlewares/authUser.js"
import { fetchUsers } from "../Controllers/userController.js"
import UploadFile from "../Middlewares/UploadFile.js"


export const adminRoutes = express.Router()
adminRoutes.post("/admin-register",adminSignUp)
adminRoutes.post("/admin-login",LoginUser)
                 
adminRoutes.get("/registered-for/:name", authenticateUser ,registeredForUsers)
adminRoutes.get("/paid-for/:name", authenticateUser , paidForUsers)
adminRoutes.get("/all-users", fetchUsers)

adminRoutes.post("/add-competition",addCompetition)
adminRoutes.get("/all-competitions",AllCompetitions)
adminRoutes.delete("/delete-competition/:id",authenticateUser, deleteCompetition)
adminRoutes.put("/update-competition/:id" ,updateCompetition)
// adminRoutes.get("/all-competition", authenticateUser,AllCompetitions)
adminRoutes.get("/competition/:id",authenticateUser,findOneCompetion)
adminRoutes.get("/all-transactions", fetchTransactions)
adminRoutes.post("/create-group", UploadFile.communityThumbnailUpload.single("image"),createGroup)
adminRoutes.get("/all-groups",getAllGroups)

adminRoutes.post("/add-interest",AddInterest)
adminRoutes.get("/all-interest", fetchAllInterests)
adminRoutes.delete("/delete-course/:courseId",deleteCourse)
