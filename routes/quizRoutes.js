import express from 'express';
import {getDailyQuiz} from '../controller/quizController.js';
import {updatePoints} from '../controller/quizController.js';
import {getPoints} from '../controller/quizController.js';
// const express=require('express');
// const {getDailyQuiz}=require('../controller/quizController');
// const {updatePoints}=require('../controller/quizController');
// const {getPoints}=require('../controller/quizController');
const router=express.Router();
router.get('/daily',getDailyQuiz);
router.patch('/updatePoints',updatePoints);


router.get('/getPoints',getPoints);
export default router;