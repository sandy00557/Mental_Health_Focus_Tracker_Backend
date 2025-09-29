// const mongoose=require('mongoose');
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

// const dotenv=require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: './config.env' });
  console.log('Loaded local environment variable');
}

dotenv.config({path:'./config.env'});
// const app=require('./app');


const DB=process.env.DATABASE
? process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
        :process.env.MONGO_URI;


mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(con=>{
    console.log(con.connections);
    console.log("DB connection successful");
    console.log(process.env.JWT_SECRET); // Should print the value from config.env
}).catch(err=>console.error('Mongodb connection failed:',err));



const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server runnning on Port ${PORT}`);
});