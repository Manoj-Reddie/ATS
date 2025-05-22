// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const pdf2pic = require("pdf2pic");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const fs = require("fs");
// const path = require("path");
// const mongoose = require("mongoose");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // MongoDB connection (optional - for storing analysis history)
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost:27017/ats_system",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

// // Schema for storing analysis results (optional)
// const AnalysisSchema = new mongoose.Schema({
//   jobDescription: String,
//   fileName: String,
//   analysisType: String,
//   result: String,
//   createdAt: { type: Date, default: Date.now },
// });

// const Analysis = mongoose.model("Analysis", AnalysisSchema);

// // Configure Google Generative AI
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// // Configure multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === "application/pdf") {
//       cb(null, true);
//     } else {
//       cb(new Error("Only PDF files are allowed!"), false);
//     }
//   },
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit
//   },
// });

// // Helper function to convert PDF to image
// async function convertPdfToImage(pdfBuffer) {
//   try {
//     // Create temporary file
//     const tempDir = path.join(__dirname, "temp");
//     if (!fs.existsSync(tempDir)) {
//       fs.mkdirSync(tempDir);
//     }

//     const tempFilePath = path.join(tempDir, `temp_${Date.now()}.pdf`);
//     fs.writeFileSync(tempFilePath, pdfBuffer);

//     // Convert PDF to image
//     const convert = pdf2pic.fromPath(tempFilePath, {
//       density: 100,
//       saveFilename: "page",
//       savePath: tempDir,
//       format: "jpg",
//       width: 600,
//       height: 800,
//     });

//     const result = await convert(1); // Convert first page only

//     // Read the converted image
//     const imagePath = result.path;
//     const imageBuffer = fs.readFileSync(imagePath);
//     const base64Image = imageBuffer.toString("base64");

//     // Clean up temporary files
//     fs.unlinkSync(tempFilePath);
//     fs.unlinkSync(imagePath);

//     return [
//       {
//         inlineData: {
//           data: base64Image,
//           mimeType: "image/jpeg",
//         },
//       },
//     ];
//   } catch (error) {
//     console.error("Error converting PDF to image:", error);
//     throw new Error("Failed to process PDF file");
//   }
// }

// // Helper function to get Gemini response
// async function getGeminiResponse(prompt, pdfContent, jobDescription) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const parts = [{ text: prompt }, ...pdfContent, { text: jobDescription }];

//     const result = await model.generateContent(parts);
//     const response = await result.response;
//     return response.text();
//   } catch (error) {
//     console.error("Error getting Gemini response:", error);
//     throw new Error("Failed to analyze resume");
//   }
// }

// // Routes
// app.get("/", (req, res) => {
//   res.json({ message: "ATS Resume Expert API is running!" });
// });

// // Resume analysis endpoint
// app.post("/api/analyze-resume", upload.single("resume"), async (req, res) => {
//   try {
//     const { jobDescription, analysisType } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ error: "Please upload a PDF resume" });
//     }

//     if (!jobDescription) {
//       return res
//         .status(400)
//         .json({ error: "Please provide a job description" });
//     }

//     // Convert PDF to image
//     const pdfContent = await convertPdfToImage(req.file.buffer);

//     // Define prompts
//     const prompts = {
//       review: `You are an experienced Technical Human Resource Manager, your task is to review the provided resume against the job description.
// Please share your professional evaluation on whether the candidate's profile aligns with the role.
// Highlight the strengths and weaknesses of the applicant in relation to the specified job requirements.`,

//       match: `You are a skilled ATS (Applicant Tracking System) scanner with a deep understanding of data science and ATS functionality,
// your task is to evaluate the resume against the provided job description. Give me the percentage of match if the resume matches
// the job description. First the output should come as percentage and then keywords missing and last final thoughts.`,
//     };

//     const selectedPrompt = prompts[analysisType] || prompts.review;

//     // Get AI response
//     const response = await getGeminiResponse(
//       selectedPrompt,
//       pdfContent,
//       jobDescription
//     );

//     // Optional: Save to database
//     try {
//       const analysis = new Analysis({
//         jobDescription,
//         fileName: req.file.originalname,
//         analysisType,
//         result: response,
//       });
//       await analysis.save();
//     } catch (dbError) {
//       console.log("Database save error (non-critical):", dbError.message);
//     }

//     res.json({
//       success: true,
//       analysis: response,
//       fileName: req.file.originalname,
//     });
//   } catch (error) {
//     console.error("Analysis error:", error);
//     res.status(500).json({
//       error: "Failed to analyze resume",
//       details: error.message,
//     });
//   }
// });

// // Get analysis history (optional)
// app.get("/api/history", async (req, res) => {
//   try {
//     const history = await Analysis.find()
//       .sort({ createdAt: -1 })
//       .limit(20)
//       .select("-result"); // Exclude large result field for list view

//     res.json({ success: true, history });
//   } catch (error) {
//     console.error("History fetch error:", error);
//     res.status(500).json({ error: "Failed to fetch history" });
//   }
// });

// // Error handling middleware
// app.use((error, req, res, next) => {
//   if (error instanceof multer.MulterError) {
//     if (error.code === "LIMIT_FILE_SIZE") {
//       return res
//         .status(400)
//         .json({ error: "File size too large. Maximum size is 10MB." });
//     }
//   }

//   res.status(500).json({ error: error.message || "Internal server error" });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Helper function to get Gemini response with PDF
async function getGeminiResponse(prompt, pdfBuffer, jobDescription) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Convert PDF buffer to base64
    const pdfBase64 = pdfBuffer.toString("base64");

    const parts = [
      { text: prompt },
      {
        inlineData: {
          data: pdfBase64,
          mimeType: "application/pdf",
        },
      },
      { text: `Job Description: ${jobDescription}` },
    ];

    console.log("Sending request to Gemini...");
    const result = await model.generateContent(parts);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error(`AI service error: ${error.message}`);
  }
}

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "ATS Resume Expert API is running!",
    port: PORT,
    status: "healthy",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    googleApiConfigured: !!process.env.GOOGLE_API_KEY,
  });
});

// Resume analysis endpoint
app.post("/api/analyze-resume", upload.single("resume"), async (req, res) => {
  console.log("=== Analysis Request Received ===");
  console.log("Time:", new Date().toISOString());

  try {
    const { jobDescription, analysisType } = req.body;

    console.log("Analysis type:", analysisType);
    console.log("Job description length:", jobDescription?.length || 0);
    console.log("File received:", req.file?.originalname || "None");
    console.log("File size:", req.file?.size || 0, "bytes");

    // Validation
    if (!req.file) {
      console.log("ERROR: No file uploaded");
      return res.status(400).json({ error: "Please upload a PDF resume" });
    }

    if (!jobDescription || jobDescription.trim().length === 0) {
      console.log("ERROR: No job description provided");
      return res
        .status(400)
        .json({ error: "Please provide a job description" });
    }

    // Check if Google API key is configured
    if (!process.env.GOOGLE_API_KEY) {
      console.log("ERROR: Google API key not configured");
      return res
        .status(500)
        .json({
          error:
            "Google API key not configured. Please set GOOGLE_API_KEY in your .env file",
        });
    }

    // Define prompts
    const prompts = {
      review: `You are an experienced Technical Human Resource Manager. Your task is to review the provided resume against the job description. 
Please share your professional evaluation on whether the candidate's profile aligns with the role. 
Highlight the strengths and weaknesses of the applicant in relation to the specified job requirements.

Please format your response clearly with:
1. Overall Assessment
2. Strengths
3. Weaknesses
4. Recommendations

Keep your analysis professional and constructive.`,

      match: `You are a skilled ATS (Applicant Tracking System) scanner with deep understanding of recruitment technology. 
Your task is to evaluate the resume against the provided job description and provide:

1. **Match Percentage**: Give a numerical score (0-100%)
2. **Missing Keywords**: List important keywords from job description that are missing in the resume
3. **Matching Keywords**: List keywords that are present in both
4. **Final Thoughts**: Brief summary and improvement suggestions

Format your response clearly with these sections.`,
    };

    const selectedPrompt = prompts[analysisType] || prompts.review;
    console.log("Using prompt type:", analysisType);

    console.log("Calling Gemini API...");
    // Get AI response
    const response = await getGeminiResponse(
      selectedPrompt,
      req.file.buffer,
      jobDescription
    );
    console.log("Gemini API response received successfully");
    console.log("Response length:", response.length, "characters");

    res.json({
      success: true,
      analysis: response,
      fileName: req.file.originalname,
      analysisType: analysisType,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("=== Analysis Error ===");
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);

    let errorMessage = "Failed to analyze resume";

    if (error.message.includes("API key")) {
      errorMessage = "Invalid Google API key. Please check your configuration.";
    } else if (error.message.includes("quota")) {
      errorMessage = "API quota exceeded. Please try again later.";
    } else if (error.message.includes("timeout")) {
      errorMessage = "Request timeout. Please try with a smaller file.";
    }

    res.status(500).json({
      error: errorMessage,
      details: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Middleware Error:", error);

  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "File size too large. Maximum size is 10MB." });
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res
        .status(400)
        .json({
          error:
            'Unexpected file field. Please use "resume" as the field name.',
        });
    }
  }

  if (error.message === "Only PDF files are allowed!") {
    return res
      .status(400)
      .json({
        error: "Only PDF files are allowed. Please upload a PDF resume.",
      });
  }

  res.status(500).json({
    error: "Internal server error",
    details: error.message,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    availableRoutes: ["GET /", "GET /api/health", "POST /api/analyze-resume"],
  });
});

// Start server
app.listen(PORT, () => {
  console.log("=================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔑 Google API configured: ${!!process.env.GOOGLE_API_KEY}`);
  console.log("=================================");
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n👋 Shutting down server...");
  process.exit(0);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
