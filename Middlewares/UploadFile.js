import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "exam_quizzes", // Cloudinary folder
      format: "png", // Convert all images to PNG
      public_id: `${file.originalname.split(".")[0]}-${Date.now()}`, // Unique ID
    };
  },
});

const courseStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "course_uploads",
    resource_type: file.mimetype.startsWith("video/") ? "video" : "raw",
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});
// Configure Multer to use Cloudinary storage
const upload = multer({ storage });

export const courseUpload = multer({storage:courseStorage})

export default upload;
