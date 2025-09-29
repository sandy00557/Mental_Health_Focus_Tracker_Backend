import express from "express";
import OpenAI from "openai";

const router = express.Router();

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/detect", async (req, res) => {
  console.log("Not received text from record");
  try {
    const { text } = req.body;
        console.log("Not received text from record",text);



    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "Text is required" });
    }
    console.log("Received text for mood detection:", text);


    // Use the new chat completion method
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Analyze the mood of the following text. Respond **with only one word**: Happy, Sad, Angry, Anxious, Tired, Neutral.  "${text}"`,
        },
      ],
      temperature: 0,
    });

    const mood = completion.choices[0].message.content.trim();
    res.json({ mood });
  } catch (error) {
    console.error("Mood detection error:", error.message);
    res.status(500).json({ error: "Mood detection failed" });
  }
});

export default router;
