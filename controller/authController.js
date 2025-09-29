// const jwt=require('jsonwebtoken');
// const User=require('../model/userModel');
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

/*It generates a JWT (JSON Web Token) using:
✅ Payload = { id: user’s MongoDB _id }
✅ Secret key = process.env.JWT_SECRET
✅ Expiry = process.env.JWT_EXPIRES_IN
 
What JWT Actually Looks Like
JWT = HEADER.PAYLOAD.SIGNATURE
Example token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6IjY0YzAxMmY4ZjhmMGE3NmEiLCJpYXQiOjE3MjI0NTcwMDAsImV4cCI6MTcyMzA2MTgwMH0.
K3aA7dNDFTzj5RxWY-UZ0QhGJpF2Ut3dUfsRQOwta8Q

Header: algorithm & token type
Payload: { id: "64c012f8f8f0a76a", iat: ..., exp: ... }
Signature: cryptographic hash to prevent tampering



Flow of JWTToken?
First when user tries to login backend checks with the password;
If the password correct creates a JWT Token and store it in the frontend. 
The token will be sent to the frontend. 
FrontEnd(react) will store it in the cookie. 
After that whenever a user search for any routes (always routes should be protected for security) it will validate with jwt token and if token is same it will let you in to the routed page.
When closig the tab and entering again still the jwt token will get stored and validate with that token .
When user clicks change password the jwt token will not get deleted but while validating it will become false.
*/
const signToken=(id)=>{
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRED_IN}
    );
}

export const protect = async (req, res, next) => {
  try {
    let token;

    console.log("=== /auth/me protect middleware called ===");
    console.log("Request headers:", req.headers);
    console.log("Cookies (req.cookies):", req.cookies);

    // 1️⃣ Try to get token from cookie
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
      console.log("Token found in cookie:", token?.slice?.(0, 20));
    }
    // 2️⃣ Else from Authorization header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token found in Authorization header:", token?.slice?.(0, 20));
    }

    // 3️⃣ If no token, reject
    if (!token) {
      return res.status(401).json({
        message: "You are not logged in, please login to get access",
        status: "fail",
      });
    }

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // 5️⃣ Find user
    const user = await User.findById(decoded.id);
    console.log("user from db:", user);

    if (!user) {
      res.clearCookie("jwt", {
        httpOnly: true,
        path: "/",
        secure: false, // set true in prod
        sameSite: "Strict",
      });
      return res.status(401).json({ message: "User no longer exists" });
    }

    // 6️⃣ Check password changed after token issued
    if (user.changedPasswordAfter(decoded.iat)) {
      res.clearCookie("jwt", {
        httpOnly: true,
        path: "/",
        secure: false, // set true in prod
        sameSite: "Strict",
      });
      return res.status(401).json({
        message: "User recently changed password! Please log in again",
        status: "fail",
      });
    }

    // 7️⃣ Attach user to request
    req.user = user;

    next();
  } catch (err) {
    console.error("Protect middleware error:", err.message);
    res.status(401).json({
      message:
        err.name === "TokenExpiredError"
          ? "Token expired, please login again"
          : "Invalid token, please login again",
      status: "fail",
    });
  }
};


// export const protect=async(req,res,next)=>{
//     let token;
//     try{
//         // const token=req.cookies.jwt;
//         console.log('=== /auth/me protect middleware called ===');
//         console.log('Request headers:', req.headers);          // shows Authorization header and Cookie header
//         console.log('Cookies (req.cookies):', req.cookies);   

//         // if (req.cookies && req.cookies.jwt) {
//         //     token = req.cookies.jwt;
//         // }

//         // // 2️⃣ If no cookie, try Authorization header
//         // else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         //     token = req.headers.authorization.split(' ')[1];
//         // }

//         if (req.cookies && req.cookies.jwt) {
//             token = req.cookies.jwt;
//             console.log('Token found in cookie (first 20 chars):', token?.slice?.(0,20));
//         } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         token = req.headers.authorization.split(' ')[1];
//         console.log('Token found in Authorization header (first 20 chars):', token?.slice?.(0,20));
//         } else {
//         console.log('No token found in cookie or Authorization header');
//         }

//         if(!token){
//             return res.status(401).json({
//                 message:'You are not logged in, please login to get access',
//                 status:'fail'
//             });
//         }
//         const decoded=jwt.verify(token,process.env.JWT_SECRET);//Verifies the JWT signature (ensures token wasn't tampered) using your secret key.
//         /*if verification is successful then decoded will be stored with:
//         {
//             id: '64eaa2a87155f5befffa980c',
//             iat: 1722293402,
//             exp: 1724885402
//         }
//         id: The user’s ID you embedded during sign()
//         iat: Issued At time (when token was generated)
//         exp: Expiration timestamp (auto-added based on expiresIn)
//         */
//         console.log('Decoded token:', decoded);
//         const user=await User.findById(decoded.id); //Finds the user in the database using the ID from the decoded token.
//         console.log('user from db:',user);
//         if(!user){
//             res.clearCookie('jwt',{
//                 httpOnly:true,
//                 path:'/',
//                 // secure:process.env.NODE_ENV==='production',
//                 secure:false,
//                 sameSite:'Strict',
//             });
//             return res.status(401).json({message:'User no longer exists'});
//         }


//          // Check if password changed after token issued
//          if(user.changedPasswordAfter(decoded.iat)){
//             res.clearCookie('jwt',{
//                 httpOnly:true,
//                 path:'/',
//                 // secure:process.env.NODE_ENV==='production',
//                 secure:false,
//                 sameSite:'Strict',
//             })
//             return res.status(401).json({
//                 message:'User recently changed password! Please log in again',
//                 status:'fail'
//             });
//          }


//          //if there is any invalidation till above line it will return and the next get anything will not work like app.get('/api/v1/user/:id',protect,getMe) getMe will not work

//          req.user=user; //Attach authenticated Person A 
//          /*why do we need to attach the user details here? 
//          for example if the user A wants to change the details of user B it should not happen for that
//          app.patch('/api/v1/users/:id', protect, restrictToSelfOrAdmin, updateUser);
//          first protect middleware will run and it will clear all the validate and attach user=userA;

//          Then it will go to restricToSelfOrAdmin
//          exports.restrictToSelfOrAdmin = (req, res, next) => {
//             const isAdmin = req.user.role === 'admin';
//             const isSameUser = req.user.id === req.params.id;
//             if (!isAdmin && !isSameUser) {
//             return res.status(403).json({ message: 'Access denied' });
//             }
//             next();
//         };
//         Here you say if the user 'A' is trying to edit his own details allow him or if admin allow him or else restrict.
//         for checking if he is user A trying to access own we need that 'req.user=user'
//         so we can check req.user.id=req.params.id 


// */
//          next();


//     }
//     catch(err){
//         res.status(401).json({
//             message:'Invalid token, please login again',
//             status:'fail'
//         })
//     }
// }

const createSendToken=(user,statusCode,res)=>{
    const token=signToken(user._id);//whenever we create a user the id will be automatically created for it in mongodb.
    
    /*This sets a cookie named jwt with the value of token in the user's browser via the response object (res). 
    This cookie will be stored automatically and sent back by the browser on every future request to your domain. 
    
    In Express.js: res.cookie()
    res.cookie is a method provided by the Express.js framework.
    It is used to set cookies in the browser via the HTTP response.*/
    res.cookie('jwt',token,{
        httpOnly:true, /*when someone injects JSX code like console.log(document.cookie) the jwt cookie wont show up because it's marked as httpONly. JavaScript running in the browser cannot access the cookie (like with document.cookie).
        Imagine your website allows users to submit a comment like:
        <form><textarea name="comment"></textarea></form>
        Now, a malicious user might submit this as a "comment":
    <script>console.log(document.cookie)</script>
    Then the cookie can be accessed so it will be available for the hacker and use it.
    So the line prevents and says that javascript cannot access the cookie it will be only available to https
        */
        path:'/', //This cookie will be available for all routes in your application.
        /*what happens if we don't use path sometimes?
        Set cookie at /login:
        You visit /login, and the cookie is set.
        Request to /login:
        Cookie is sent.
        Request to /dashboard:
        Cookie is not sent. */
        // secure:process.env.NODE_ENV==='production', //If in production, cookie will only be sent over HTTPS (not HTTP).
        secure:false,
        sameSite:'Lax',
        // maxAge:90*24*60*60*1000 //Cookie will expire in 90 days (in milliseconds).For extra protection.
        // maxAge:10*1000 //10 seconds
        maxAge:process.env.JWT_COOKIE_EXPIRES_IN*60*60*1000
    })

    user.password=undefined; //to not send the password in the response, as it is sensitive information. 

    console.log("📤 Sending cookie:", res.getHeaders()["set-cookie"]);
    res.status(statusCode).json({
        status:'success',
        token,
        user:user
    });
};



// export const login=async(req,res)=>{
//     try{
//         const {email,password}=req.body; //get email id and password from the body 
//         if(!email || !password)
//             return res.status(400).json({message:'Please provide email and password'});

//         const user=await User.findOne({email}).select('+password');
//         /*why we are doing +password here?
//         when we actually do findONe{email} it will find the user by email id from the database and will return all the user details. 
//         but password will not be available as in schema default it will be set as false. 
//         Then we cannot use it for validation. so we select it using +password */
//         if(!user || !(await user.correctPassword(password,user.password))){//checking password given in body is same with the database
//             return res.status(401).json({message:'Invalid email or password'});
//         }

//         createSendToken(user,200,res);
//     }
//     catch(err){
//         res.status(500).json({message:err.message});
//     }
// };



export const updatePassword=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('+password');
        const {currentPassword,newPassword}=req.body;
        if(!currentPassword || !newPassword){
            return res.status(400).json({
              status:"fail",
              message:'Please provide current and new password'});
        }

        if(!await user.correctPassword(currentPassword,user.password)){
            return res.status(401).json({
              status:"fail",
              message:'Current password is incorrect'});
        }

        user.password=newPassword;
        user.passwordChangedAt=Date.now();

        await user.save();//save is a predefined method in mongoose which will be used to save the data in the database when we make any changes.
        createSendToken(user,200,res); //send the token after updating the password
    }
    catch(err){
        res.status(500).json({
          status:'fail',
          message:err.message
        });
    }
}

/*...roles is a rest parameter. 
 foreg: app.delete('/api/v1/users/:id', protect, restrictTo('admin', 'moderator'), deleteUser);
 here only admin and moderator can make changes but we should pass two parametes. so we use rest parameters*/
export const restrictTo=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                message:'You do not have permission to perform this action',
                status:'fail'
            });
        }
        next();
        
    }
}




export const register=async(req,res)=>{
    try{
        const {name,email,password, nickname, moodGoal, focusGoal, language, theme}=req.body;
        const newUser=await User.create({
            name,//this maps frontend fullName to Mongodb
            email,
            password,
            ...(nickname && {nickname}),
            ...(moodGoal && { moodGoal }),
            ...(focusGoal && { focusGoal }),
            ...(language && { language }),
            ...(theme && { theme }),
            /*This means:
            If condition is truthy (e.g., nickname is a non-empty string), spread { nickname: 'Ally' } into the object.
            If condition is falsy (e.g., nickname is undefined or ""), then it spreads false, which is ignored — so nothing is added */
        }); //now the data gets stored in the database.
        createSendToken(newUser,201,res);  //201 refers to creation
    }
    catch(err){
        res.status(404).json({
            status:'fail',
            message:err.message
        })
    }
};


//want to learn.
export const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({ status: 'success' });
};



export const getMe=(req,res)=>{
    return res.status(200).json({
        status:"success",
        user:req.user
    })
}




export const loginuser=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return res.status(200).json({
            status:"failz",
            message:"User not found"
        })
    }
    console.log("User DB password",user.password);
    console.log("User input password",password);
    const passwordCorrect=await user.correctPassword(password,user.password);
    if(!passwordCorrect){
        return res.status(200).json({
            status:"fail",
            message:"Password is incorrect"
        })
    }
    if(passwordCorrect){
        createSendToken(user,200,res);
    }

}