// const express = require("express");
// const fetch = require("node-fetch"); // if using Node < 18
// // For Node 18+, fetch is built-in

// const router = express.Router();

// // GET /api/v1/pdf?url=<externalPDFUrl>&name=<filename>
// router.get("/", async (req, res) => {
//   const { url, name } = req.query;
//    console.log("✅ /api/v1/pdf route hit:", req.query); 

//   if (!url) return res.status(400).json({ message: "PDF URL is required" });

//   try {
//     // Fetch PDF from external server
//     const response = await fetch(url);
//     if (!response.ok) throw new Error("Failed to fetch PDF");

//     const buffer = await response.arrayBuffer();

//     // Set headers for download
//     res.set({
//       "Content-Type": "application/pdf",
//       "Content-Disposition": `attachment; filename="${name || "download.pdf"}"`,
//     });

//     res.send(Buffer.from(buffer));
//   } catch (error) {
//     console.error("PDF download error:", error);
//     res.status(500).json({ message: "Failed to download PDF" });
//   }
// });

// module.exports = router;












// const express = require("express");
// const PDFDocument = require("pdfkit");

// const router = express.Router();

// // GET /api/v1/pdf/download
// router.get("/download", (req, res) => {
//   try {
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

//     const doc = new PDFDocument();
//     doc.pipe(res);

//     // PDF Content
//     doc.fontSize(20).text("Mental Health Tracker Report", { align: "center" });
//     doc.moveDown();
//     doc.fontSize(12).text("Hello! This is your PDF report generated from Node.js and Express.");
//     doc.moveDown();
//     doc.text("Key Features:");
//     doc.list([
//       "Track your daily moods",
//       "Save notes securely",
//       "Export progress as PDF",
//     ]);

//     doc.end();
//   } catch (err) {
//     console.error("Error generating PDF:", err);
//     res.status(500).json({ message: "Failed to generate PDF" });
//   }
// });

// module.exports = router;














// routes/pdfRoutes.js
// const express = require("express");
import express from "express";
import axios from "axios";
import path from "path";
// const axios = require("axios");
// const path = require("path");

const router = express.Router();

/**
 * GET /api/v1/pdf?url=<PDF_LINK>&name=<FILENAME>
 */
router.get("/", async (req, res) => {
  try {
    const { url, name } = req.query;

    if (!url || !name) {
      return res.status(400).json({ message: "Missing url or name parameter" });
    }

    // Fetch the remote PDF
    const response = await axios.get(url, { responseType: "arraybuffer" });

    // Set headers so browser downloads it
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${path.basename(name)}"`
    );

    // Send the file
    res.send(response.data);
  } catch (err) {
    console.error("Error downloading PDF:", err.message);
    res.status(500).json({ message: "Failed to download PDF" });
  }
});

export default router;
