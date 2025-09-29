// import "dotenv/config";
// import axios from "axios";
// import { Agent } from "https";

// const HF_API_URL =
//   "https://api-inference.huggingface.co/models/superb/hubert-base-superb-er";

// // Local only: bypass TLS check. In prod (Netlify/Vercel), normal validation.
// const httpsAgent =
//   process.env.NODE_ENV === "production"
//     ? undefined
//     : new Agent({ rejectUnauthorized: false });

// export const detectEmotion = async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) {
//       return res.status(400).json({ status: "error", error: "Audio file is required" });
//     }

//     console.log("✅ Received file:", {
//       mimetype: file.mimetype,
//       size: file.size,
//     });

//     const { data } = await axios.post(HF_API_URL, file.buffer, {
//       headers: {
//         Authorization: `Bearer ${process.env.HF_API_KEY}`,
//         "Content-Type": file.mimetype || "audio/webm",
//       },
//       httpsAgent,
//       timeout: 30000,
//       maxContentLength: Infinity,
//       maxBodyLength: Infinity,
//     });

//     // Hugging Face returns array of {label, score}
//     let top = null;
//     if (Array.isArray(data) && data.length) {
//       top = data.reduce((best, x) => (x.score > (best?.score ?? 0) ? x : best), null);
//     } else if (data?.error) {
//       return res.status(503).json({ status: "error", error: data.error });
//     }

//     res.json({
//       status: "success",
//       emotion: top?.label || "unknown",
//       confidence: top?.score ?? null,
//       raw: data,
//     });
//   } catch (err) {
//     console.error("❌ Emotion Detection Error:", err.response?.data || err.message);
//     res
//       .status(err.response?.status || 500)
//       .json({ status: "error", error: err.message, details: err.response?.data });
//   }
// };



// import "dotenv/config";
import "dotenv/config";
import axios from "axios";
import { Agent } from "https";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs-extra";
import path from "path";
import os from "os";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const HF_API_URL =
  "https://api-inference.huggingface.co/models/superb/hubert-large-superb-er";



const httpsAgent =
  process.env.NODE_ENV === "production"
    ? undefined
    : new Agent({ rejectUnauthorized: false });

const tempDir = path.join(os.tmpdir(), "emotion-temp");
fs.ensureDirSync(tempDir);

const convertToWav = (inputBuffer, outputPath) =>
  new Promise((resolve, reject) => {
    const tempInput = path.join(tempDir, `in_${Date.now()}.webm`);
    fs.writeFileSync(tempInput, inputBuffer);
    ffmpeg(tempInput)
      .toFormat("wav")
      .audioFrequency(16000)
      .audioChannels(1)
      .audioCodec("pcm_s16le")
      .on("end", () => {
        fs.remove(tempInput, () => {});
        resolve(outputPath);
      })
      .on("error", (e) => {
        fs.remove(tempInput, () => {});
        fs.remove(outputPath, () => {});
        reject(e);
      })
      .save(outputPath);
  });

const cleanupOld = () => {
  const now = Date.now();
  fs.readdirSync(tempDir).forEach((f) => {
    const p = path.join(tempDir, f);
    if (now - fs.statSync(p).mtimeMs > 3600e3) fs.removeSync(p);
  });
};
cleanupOld();
setInterval(cleanupOld, 3600e3);

export const detectEmotion = async (req, res) => {
  let wavPath = null;
  try {
    const file = req.file;
    if (!file)
      return res
        .status(400)
        .json({ status: "error", error: "Audio file is required" });

    const ts = Date.now();
    wavPath = path.join(tempDir, `out_${ts}.wav`);
    await convertToWav(file.buffer, wavPath);
    const wavBuffer = fs.readFileSync(wavPath);

    const { data } = await axios.post(HF_API_URL, wavBuffer, {
      headers: {
  Authorization: `Bearer ${process.env.HF_API_KEY}`,
  "Content-Type": "application/octet-stream",
},
      httpsAgent,
      timeout: 60000,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    fs.removeSync(wavPath);
    wavPath = null;

    let emotion = "unknown",
      confidence = 0;
    if (Array.isArray(data) && data.length) {
      const top = data.reduce((b, c) => (c.score > b.score ? c : b));
      emotion = top.label;
      confidence = top.score;
    }

    res.json({
      status: "success",
      emotion,
      confidence,
      raw: data,
    });
  } catch (err) {
    if (wavPath) fs.removeSync(wavPath);
    console.error(err);
    res
      .status(err.response?.status || 500)
      .json({ status: "error", error: err.message });
  }
};

// Graceful shutdown
const shutdown = () => fs.removeSync(tempDir);
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
