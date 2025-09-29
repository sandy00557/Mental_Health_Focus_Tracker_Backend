import 'dotenv/config';
import OpenAI from "openai";

console.log("API KEY:", process.env.OPENAI_API_KEY ? "Loaded ✅" : "Missing ❌");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getCoachResponse = async (req, res) => {
  try {
    const { mood ,systemContent} = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `${systemContent}` },
        { role: "user", content: `My mood is ${mood}` },
      ],
    });

    res.status(200).json({
      status: "success",
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI Error:", error);
    if(error.status==="429"){
      return res.status(429).json({
        status:'error',
        error:"Daily chat limit Exceeded"
      })
    }
    res.status(500).json({ status: "error", error: error.message });
  }
};
