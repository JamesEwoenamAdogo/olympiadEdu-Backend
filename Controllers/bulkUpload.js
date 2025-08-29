import { userModel } from "../Model/userModel.js";
import { examinationModel } from "../Model/Examination.js";


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

export const examinationGradeChange = async (req, res) => {
  try {
    const allExams = await examinationModel.find({});
    
    for (let exam of allExams) {
      let newGrade = [];

      if (typeof exam.grade === "string") {
        if (exam.grade.includes("-")) {
          // Handle range: "1-3"
          const [start, end] = exam.grade.split("-").map(n => parseInt(n.trim()));
          for (let i = start; i <= end; i++) {
            newGrade.push(i);
          }
        } else if (exam.grade.includes(",")) {
          // Handle comma-separated: "1,3,5"
          newGrade = exam.grade.split(",").map(n => parseInt(n.trim()));
        } else {
          // Handle single value: "3"
          newGrade = [parseInt(exam.grade.trim())];
        }
      } else if (Array.isArray(exam.grade)) {
        // Already array, ensure integers
        newGrade = exam.grade.map(n => parseInt(n));
      }

      if (newGrade.length > 0) {
        await examinationModel.findByIdAndUpdate(
          exam._id,
          { grade: newGrade },
          { new: true }
        );
      }
    }

    return res.json({ success: true, message: "Grades updated successfully" });

  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ success: false, message: "Error processing grades", error });
  }
};

