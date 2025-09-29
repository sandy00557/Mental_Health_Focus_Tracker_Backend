// const express=require('express');
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// const cors=require('cors');
// const cookieParser=require('cookie-parser');
/*why do we need cors?
1. What is CORS?
CORS = Cross-Origin Resource Sharing

It’s a security feature enforced by browsers.

🔒 Problem it solves:
If your frontend (React) is hosted at http://localhost:3000
and your backend (Node.js/Express) is at http://localhost:5000
then the browser blocks the request by default — because they are on different “origins”.

This is called a CORS error.

Why do we use cors() middleware?
To tell the browser:

“It’s okay for this frontend (e.g. React app) to make requests to this backend.”

So, we enable CORS in Express like this:
const cors = require('cors');
app.use(cors());

This middleware adds special HTTP headers that allow cross-origin requests.*/
// const authRoutes=require('./routes/authRoutes');
// const devRoutes=require('./routes/devRoutes');
// const quizRoutes=require('./routes/quizRoutes');
// const productRoutes=require('./routes/productRoutes');
// const pdfRoutes=require('./routes/pdfRoutes');
// const coachRoutes=require('./routes/coachRoutes');

import authRoutes from './routes/authRoutes.js';
import devRoutes from './routes/devRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import productRoutes from './routes/productRoutes.js';
import pdfRoutes from './routes/pdfRoutes.js';
import coachRoutes from './routes/coachRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import checklistRoutes from './routes/checklistRoutes.js';
import emotionRoutes from './routes/emotionRoutes.js';
// import loginRoutes from './routes/loginRoutes.js';
const app=express();

app.use(cors({
    origin:'http://localhost:5173', 
    credentials:true 
}));//if we put "use" then it is a middleware. To have middleware we need express.So we require express.
app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({extended:true,limit:'10mb'}));

app.use(cookieParser());


app.use('/api/v1/pdf', pdfRoutes);
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/dev',devRoutes);
app.use('/api/v1/quiz',quizRoutes);
app.use('/api/v1/products',productRoutes);
app.use('/api/v1/coach',coachRoutes);
app.use("/api/v1/mood", moodRoutes);
app.use("/api/v1/list", checklistRoutes);
app.use("/api/v1/emotion", emotionRoutes);
// app.use("/api/v1/user",loginRoutes);
// module.exports=app;
export default app;