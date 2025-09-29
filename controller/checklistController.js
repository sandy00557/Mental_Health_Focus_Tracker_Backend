import OpenAI from "openai";
import User from "../model/userModel.js";
// ✅ Initialize OpenAI here once
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Fallback checklists (age-based)
const fallbackChecklists = {
  child: [
    "Draw your favorite cartoon character",
    "Build something with blocks or Lego",
    "Dance to a fun song",
    "Read a short comic or storybook",
    "Play a guessing game with family",
    "Watch a funny cartoon",
    "Make a paper plane and fly it",
  ],
  teen: [
    "Listen to an upbeat playlist",
    "Do a 5-minute body stretch",
    "Watch a comedy video",
    "Write down your thoughts in a journal",
    "Play a short video game",
    "Call or text a friend",
    "Take a short walk outside",
  ],
  adult: [
    "Do 10 minutes of deep breathing",
    "Write three things you’re grateful for",
    "Cook or eat your favorite snack",
    "Watch a funny short video",
    "Call a loved one to chat",
    "Go for a short brisk walk",
    "Do a quick home workout",
  ],
  senior: [
    "Listen to nostalgic music",
    "Take a slow mindful walk",
    "Read an uplifting poem",
    "Call a family member",
    "Do gentle stretches",
    "Look through old happy photos",
    "Practice deep breathing exercises",
  ],
};

export const checkList=async(req,res)=>{
    try{
        const {mood,age}=req.body;
        console.log("Received checklist request:", {mood, age});
        const prompt = `
The user is ${age} years old and says: "${mood}".

Generate exactly 7 safe, age-appropriate, and practical activities 
the user can do right now.

Rules:
- If the mood is negative (sad, lonely, depressed, anxious): suggest uplifting, calming, social, or enjoyable activities.  
- If the mood is positive (happy, excited, energetic): suggest fun, productive, or growth-oriented activities.  
- If the input indicates a physical issue (like "headache" or "tired"): suggest gentle, safe, non-medical relief activities.  
- Keep each activity short (maximum 12 words).  
- Make the ideas specific, creative, and immediately doable.  
- Always ensure suggestions are positive and safe for the given age group.  
- Return only a numbered list of 7 items.  
`;
        const response=await openai.chat.completions.create({
            model:"gpt-4o-mini",
            messages:[{role:"user",content:prompt}],
            temperature:0.8,
        });
        let suggestions = response.choices[0].message.content
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => line.replace(/^\d+\.\s*/, "")) // remove numbering
      .slice(0, 7); // ensure 7 items

    // If AI gave less/more or something odd → fallback
    if (suggestions.length !== 7) {
      if (age < 10) suggestions = fallbackChecklists.child;
      else if (age < 18) suggestions = fallbackChecklists.teen;
      else if (age < 40) suggestions = fallbackChecklists.adult;
      else suggestions = fallbackChecklists.senior;
    }

    // return res.json({ checklistData: suggestions });
    return res.status(200).json({
        status:'success',
        checkListData:suggestions ,
        locked:true
    })
    }
    catch(err){
        console.error("AI error → using fallback:", err.message);

    // Fallback by age
    const { age } = req.body;
    let fallback = [];
    if (age < 10) fallback = fallbackChecklists.child;
    else if (age < 18) fallback = fallbackChecklists.teen;
    else if (age < 40) fallback = fallbackChecklists.adult;
    else fallback = fallbackChecklists.senior;

    return res.status(500).json({
        status:'fail',
        message:err.message,
        checkListData:fallback 
    })
    }
}




// export const updatePoints=async(req,res)=>{
//   try{
//     console.log("Received data from frontend");
//     console.log("Req.body received:*************************************8", req.body);
//     const {points,_id}=req.body;
//     console.log("************************points received");
//   if(!points || !_id){
//     return res.status(400).json({
//       status:'fail',
//       message:'Points and email are required'
//     })
//   }
//   const user=await User.findOne({_id});
//   if(!user){
//     return res.status(404).json({
//       status:'fail',
//       message:'No user found'
//     })
//   }
//   const today=new Date();
//   today.setHours(0,0,0,0);

//   const last =new Date(user.lastChecklistCompletedDate);
//   last.setHours(0,0,0,0);
//   if(last.getTime()===today.getTime()){
//     return res.status(409).json({
//       status:"fail",
//       message:"Today's CheckList already completed",
//       lastdate:lastdate.getTime()
//     })
//   }
//   if(user.lastChecklistCompletedDate===null || last.getTime()!==today.getTime()){
//     user.points+=50;
//     await user.save();
//     return res.status(200).json({
//     status:'success',
//     message:`Points updated successfully. New points: ${user.points}`,
//     newPoints:user.points ,
//     lastdate:lastdate.getTime()
//     })
//   }

//   }
//   catch(err){
//     return res.status(500).json({
//       status:'fail',
//       message:"Internal API Error"
//     })
//   }
// }








// export const updatePoints=async(req,res)=>{
//   try{
//     console.log("Received data from frontend");
//     console.log("Req.body received:*************************************8", req.body);
//     const {points,_id}=req.body;
//     console.log("************************points received");
//   if(!points || !_id){
//     return res.status(400).json({
//       status:'fail',
//       message:'Points and email are required'
//     })
//   }
//   console.log("Points and id received", points, _id);
// const user = await User.findById(_id); 
//   if(!user){
//     return res.status(404).json({
//       status:'fail',
//       message:'No user found'
//     })
//   }
//   console.log("User found:", user);
//   const today=new Date();
//   today.setHours(0,0,0,0);
//   console.log("Today's date (normalized):", today);

//   user.lastChecklistCompletedDate=today;

//   console.log("Last checklist completed date:", user.lastChecklistCompletedDate);
//   user.points+=50;
//   await user.save();
//   console.log("After user.lastChecklistCompletedDate"+user.lastChecklistCompletedDate);
//   return res.status(200).json({
//     status:'success',
//     message:`Points updated successfully. New points: ${user.points}`,
//     newPoints:user.points ,
//     lastdate:user.lastChecklistCompletedDate.getTime()
//   })
//   // const last =new Date(user.lastChecklistCompletedDate);
//   // last.setHours(0,0,0,0);
//   // if(last.getTime()===today.getTime()){
//   //   return res.status(409).json({
//   //     status:"fail",
//   //     message:"Today's CheckList already completed",
//   //     lastdate:lastdate.getTime()
//   //   })
//   // }
//   // if(user.lastChecklistCompletedDate===null || last.getTime()!==today.getTime()){
//   //   user.points+=50;
//   //   await user.save();
//   //   return res.status(200).json({
//   //   status:'success',
//   //   message:`Points updated successfully. New points: ${user.points}`,
//   //   newPoints:user.points ,
//   //   lastdate:lastdate.getTime()
//   //   })
//   // }

//   }
//   catch(err){
//     return res.status(500).json({
//       status:'fail',
//       message:"Internal API Error"
//     })
//   }
// }

export const updatePoints = async (req, res) => {
  try {
    console.log("Received data from frontend:", req.body);
    const { points, _id, lastdate } = req.body;   // ✅ include lastdate

    if (!points || !_id) {
      return res.status(400).json({
        status: "fail",
        message: "Points and ID are required",
      });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "No user found",
      });
    }

    // ✅ set from frontend if provided
    if (lastdate) {
      user.lastChecklistCompletedDate = new Date(lastdate);
    }

    user.points = points;
    await user.save();

    console.log("Updated user:", user);

    return res.status(200).json({
      status: "success",
      message: `Points updated successfully. New points: ${user.points}`,
      newPoints: user.points,
      lastdate: user.lastChecklistCompletedDate,
    });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({
      status: "fail",
      message: "Internal API Error",
    });
  }
};



// export const updatePoints = async (req, res) => {
//   try {
//     console.log("Received data from frontend");
//     const { points, _id } = req.body;

//     if (!points || !_id) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Points and ID are required",
//       });
//     }

//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).json({
//         status: "fail",
//         message: "No user found",
//       });
//     }

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // ✅ Force update
//     user.lastChecklistCompletedDate = today;
//     user.points = points; // use frontend-calculated value or `user.points += 50`
//     user.markModified("lastChecklistCompletedDate");

//     await user.save();

//     console.log("Updated user:", user);

//     return res.status(200).json({
//       status: "success",
//       message: `Points updated successfully. New points: ${user.points}`,
//       newPoints: user.points,
//       lastdate: user.lastChecklistCompletedDate.getTime(),
//     });
//   } catch (err) {
//     console.error("Update error:", err);
//     return res.status(500).json({
//       status: "fail",
//       message: "Internal API Error",
//     });
//   }
// };



export const status=async(req,res)=>{
  try{
    const {_id}=req.body;
    if(!_id){
      return res.status(400).json({
        status:"fail",
        message:"Provide ID"
      })
    }
    const user=await User.findById(_id);
    if(!user){
      return res.status(404).json({
        status:"fail",
        message:"User not found"
      })
    }
    const today=new Date();
    today.setHours(0,0,0,0);

    const last =new Date(user.lastChecklistCompletedDate);
    last.setHours(0,0,0,0);
    if(last.getTime()===today.getTime()){
    return res.status(200).json({
      status:"successs",
      locked:true,
      message:"Today's CheckList already completed"
    })
    }
    if(last.getTime()!==today.getTime() || user.lastChecklistCompletedDate===null){
    return res.status(200).json({
      status:"success",
      locked:false,
      message:"Today's CheckList is pending"
    })
  }
}
  catch(err){
    console.log(err);
    return res.status(500).json({
      status:"fail",
      message:"Internal API Error"
    })
  }
}