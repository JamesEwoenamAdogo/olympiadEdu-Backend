import { userModel } from "../Model/userModel.js";


import XLSX from "xlsx";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { raw } from "express";
// import MyModel from "../models/myModel.js"; // replace with your schema/model

// Helper to get current file dir (for ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Read uploaded file
    const filePath = path.join(__dirname, "../uploads", req.file.filename);
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // first sheet
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {raw:false});

    // sheetData is now an array of objects
    // Example: [{ name: "John", age: 22 }, { name: "Jane", age: 30 }]

    // Insert into MongoDB
    // const insertedDocs = await MyModel.insertMany(sheetData);
    // console.log(sheetData)
    for(let data of sheetData){
        let firstName = data.FullName.split(" ")[0]
        let lastName = data.FullName.split(" ")[1]
        let dob = data.DateOfBirth
        let School = data.School
        let email = data.email
        let mobileNumber = data.mobileNumber
        const newUser = new userModel({firstName,lastName,dob,School,email,mobileNumber})
        newUser.save()

    }

    // Clean up file after processing
    fs.unlinkSync(filePath);

    return res.status(200).json({
      success: true,
      message: "Excel data uploaded successfully",
    //   count: insertedDocs.length,
    //   data: insertedDocs,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: "Error processing file", error });
  }
};
