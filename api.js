import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { userRoute } from "./Route/userRoute.js"
import { adminRoutes } from "./Route/adminRoute.js"

dotenv.config()

app.use(cors())
app.use(express.json())
const app = express()


const port = process.env.PORT
const mongo = process.env.MONGO_URL
app.listen(port,()=>{
    console.log("Server connected")
})
mongoose.connect(mongo).then(()=>{
    console.log("Database connected")
})

app.use("/api/v1",userRoute)
app.use("/api/v1", adminRoutes)


