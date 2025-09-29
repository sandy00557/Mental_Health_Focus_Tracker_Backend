// import User from '../model/userModel.js';
// export const getUser=async(req,res)=>{
//     const {email,password}=req.body;
//     const user=await User.findOne({email}).select("+password");
//     if(!user){
//         return res.status(404).json({
//             status:"fail",
//             message:"User not found"
//         })
//     }
//     console.log("User DB password",user.password);
//     console.log("User input password",password);
//     const passwordCorrect=await user.correctPassword(password,user.password);
//     if(!passwordCorrect){
//         return res.status(400).json({
//             status:"fail",
//             message:"Password is incorrect"
//         })
//     }
//     if(passwordCorrect)
//     return res.status(200).json({
//         status:"success",
//         nickname:user.nickname,
//         message:"User is logged in"

//     })

// }