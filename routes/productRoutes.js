// const express=require('express');
import express from 'express';
const router=express.Router();
// import {getAllProducts} from '../controller/productsController.js';
import * as productsController from '../controller/productsController.js';
// const {getAllProducts}=require('../controller/productsController');

router.get('/',productsController.getAllProducts);
router.patch('/',productsController.deductPoints);

export default router;