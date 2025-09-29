// const {getCoachResponse}=require('../controller/coachController');
import express from 'express';
import {getCoachResponse} from '../controller/coachController.js';
const router=express.Router();

router.post('/',getCoachResponse);

export default router;