import express from 'express';
// const products=require('../model/productsModel');
import products from '../model/productsModel.js';

import User from '../model/userModel.js';

export  const getAllProducts=async(req,res)=>{
    try{
        const productsList=await products.find();
        if(!productsList || productsList.length===0){
            return res.status(404).json({
                status:'fail',
                message:'No products found'
            })
        }
        return res.status(200).json({
            status:'success',
            data:productsList 
        })
        
    }
    catch(err){
        console.error('Error fetching products:',err);
        return res.status(500).json({
            status:'fail',
            message:'Internal Server Error'
        })
    }
}


// export const deductPoints=async(req,res)=>{
//     const {points,userId}=req.body;
//     const user=await User.findById(userId);
//     if(!user){
//         return res.status(404).json({
//             status:'fail',
//             message:'No user found'
//         })
//     }
//     user.points-=points;
//     // user.productsBought=productsBought+1;
//     await user.save();
//     return res.status(200).json({
//         status:'success',
//         newpoints:user.points 
//     })
// }


export const deductPoints=async(req,res)=>{
    const {points,userId,productsBought}=req.body;
    const user=await User.findById(userId);
    if(!user){
        return res.status(404).json({
            status:'fail',
            message:'No user found'
        })
    }
    user.points-=points;
    user.productsBought=productsBought+1;
    await user.save();
    return res.status(200).json({
        status:'success',
        newpoints:user.points,
        updatedProductsBought:user.productsBought
    })
}