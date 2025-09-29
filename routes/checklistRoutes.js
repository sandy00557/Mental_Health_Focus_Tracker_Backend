import express from 'express';
const router=express.Router();
import {checkList,updatePoints,status} from "../controller/checklistController.js";
router.post("/checklist",checkList);
router.post("/newPoints",updatePoints);
router.post("/status",status);
export default router;