// const express=require('express');
import express from 'express';
/*// userController.js
exports.getPoints = async (req, res) => {
  // logic
};

{
  getPoints: [Function: getPoints]
}

So if we want to get getPoints function from userController.js, we can only get it using curly braces
 */
// const {getPoints}=require('../controller/quizController');
import {getPoints} from '../controller/quizController.js';
const router=express.Router();

router.get("/points",getPoints);
// module.exports=router;
export default router;