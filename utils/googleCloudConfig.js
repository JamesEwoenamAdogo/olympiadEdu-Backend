import { Storage } from "@google-cloud/storage";
const path = require("path")


const googleCloudStorage = new Storage({keyFilename: path.join(__dirname,"./analog-memento-455312-d8-379164cc9b2a.json"), projectId:"analog-memento-455312-d8"})

googleCloudStorage.getBuckets(x=> console.log(x))
const googleStorage = googleCloudStorage.bucket("gifted")

export const uploadToGCS = async (file) => {
    return new Promise((resolve, reject) => {
      const blob = googleStorage.file(Date.now() + "-" + file.originalname);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: { contentType: file.mimetype },
      });
  
      blobStream.on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${googleStorage.name}/${blob.name}`;
        resolve(publicUrl);
      });
  
      blobStream.on("error", (err) => {
        reject(err);
      });
  
      blobStream.end(file.buffer);
    });
  };
