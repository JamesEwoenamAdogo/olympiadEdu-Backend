import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import http from "http"
import { Server } from "socket.io"

import { userRoute } from "./Route/userRoute.js"
import { adminRoutes } from "./Route/adminRoute.js"
import examRoute from "./Route/examinationRoute.js"
import { courseRoute } from "./Route/CourseRoute.js"
import { analyticsRoutes } from "./Route/analyticsRoute.js"

dotenv.config()

const app = express()
const server = http.createServer(app) // ⬅️ important change

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // allow frontend origin here
    methods: ["GET", "POST"],
  },
})

// Listen for socket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id)

  socket.on("sendMessage", (messageData) => {
    // Broadcast to others in the room
    io.emit("receiveMessage", messageData)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })
})

app.use(cors())
app.use(express.json())

const port = process.env.PORT
const mongo = process.env.MONGO_URL

// Start the combined Express + Socket.IO server
server.listen(port, () => {
  console.log(`Server connected on port ${port}`)
})

mongoose.connect(mongo).then(() => {
  console.log("Database connected")
})

// Your existing routes
app.use("/api/v1", userRoute)
app.use("/api/v1", adminRoutes)
app.use("/api/v1", examRoute)
app.use("/api/v1", courseRoute)
app.use("/api/v1", analyticsRoutes)
