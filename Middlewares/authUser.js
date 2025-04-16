import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

io.use((socket, next) => {
  const token = socket.handshake.auth.token; // token sent from client

  if (!token) {
    return next(new Error("Authentication error: No token provided"));
  }

  try {
    const verifyUser = jwt.verify(token, process.env.TOKEN_SECRET);
    
    socket.user = { id: verifyUser.id }; // Store user info in socket

    next();
  } catch (err) {
    console.error("JWT verification failed", err);
    next(new Error("Authentication error: Invalid token"));
  }
});
