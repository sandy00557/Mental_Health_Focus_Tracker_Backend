// const User=require('../model/userModel');
// const Quiz=require('../model/quizModel');

import User from '../model/userModel.js';
import Quiz from '../model/quizModel.js';


export const updatePoints=async(req,res)=>{
  try{
    //axios sent a patch request with body of {points:20} for eg
    console.log('updatePoints called with body:',req.body);//Debug Log
    const {points,userId}=req.body;
    if(!points || !userId){
      console.log('Missing points or userId in request body'); //Debug Log
      return res.status(404).json({
        status:'fail',
        message:'Points and userId are required'
      })
    }
    const user=await User.findById(userId);
    if(!user){
      console.log('No user found with the provided userId:',userId); //Debug Log
      return res.status(404).json({
        status:'fail',
        message:'No user found'
      });
    }

    const today=new Date();
    today.setHours(0,0,0,0);

    user.points+=points;
    user.lastQuizCompletedDate=today;
    user.todayQuizCompleted=true;


    await user.save();
    console.log('Points updated successfully for user:',user.points); //Debug Log

    return res.status(200).json({
      status:'success',
      message:`Points updated successfully. New points: ${user.points}`,
      newPoints:user.points 
    });

  }
  catch(err){
    console.error('Error updating points:',err);
    return res.status(500).json({
      status:'fail',
      message:err.message
    });
  }
};


export const getDailyQuiz = async (req, res) => {
  try {
    const userId=req.query.id || "68955900ea39ddff800e24ba";
    const user = await User.findById(userId);

    if(!user){
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }


    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison
    /*
        why we need today.setHours?
        Because while getting new Date() time also will get added.
        So If we compare today date and last date . If both are same but differed by time then it will be an issue.
        So We are setting the time to 0
     */

    const lastCompletedDate=user.lastQuizCompletedDate ? new Date(user.lastQuizCompletedDate) : null;
    if(lastCompletedDate){
      lastCompletedDate.setHours(0,0,0,0);
      if(lastCompletedDate.getTime()=== today.getTime()){
        return res.status(200).json({
          status:'success',
          message:'Quiz already completed today',
          quizCompleted:true,
          quizDay:user.quizDay,
          points:user.points 
        });
      }
    }

    const lastQuizDate=user.lastQuizDate ? new Date(user.lastQuizDate) : null;
    if (!user.firstQuizDate) {
      user.firstQuizDate = today;
      user.quizDay = 1;
      user.lastQuizDate = today;
      user.todayQuizCompleted=false;
      await user.save();
    } else if(!lastQuizDate || lastQuizDate.getTime() !== today.getTime()) {
        /*| Comparison                            | Result | Explanation                             |
              | ------------------------------------- | ------ | --------------------------------------- |
              | `date1 === date2`                     | false  | Different objects, so false             |
              | `date1.getTime() === date2.getTime()` | true   | Compares primitive timestamps correctly |
 */
      // const lastQuizDate = new Date(user.lastQuizDate);
      // lastQuizDate.setHours(0, 0, 0, 0);

      // if (lastQuizDate.getTime() !== today.getTime()) {
        user.quizDay = ((user.quizDay ?? 1) % 10) + 1;
        /*why do we set user.quizDay??1 ?
                 Uses the nullish coalescing operator (??) to say:
                If user.quizDay is defined (not null or undefined), use its value.
                Otherwise, default to 1.
                But in mongodb itself we have set to default 1 right? But if you forget to mention quizDay while posting the user at that time it will become an issue . so for safety purpose we use it.
                
                (user.quizDay ?? 1) % 10
                Calculates remainder after dividing by 10, so if quizDay is 10, (10 % 10) is 0.
                For any number 1-9, % 10 returns the number itself (since less than 10).
                
                
                If user.quizDay is 10, then 10 % 10 equals 0.       
                So without adding +1, the quiz day would cycle like this: 10 → 0 → 1 → 2 → ...
                Quiz day 0 doesn’t make sense because your quiz days are from 1 to 10.*/
        user.lastQuizDate = today;
        user.todayQuizCompleted=false;
        await user.save();
      }

    const skipCount = (user.quizDay - 1) * 10;
    //for eg quizDay=1 then (1-1)*10=0 -> skip 0 questions
        //on quizDay=2 then (2-1)*10=10; -> skip 10 questions 
    const quizzes = await Quiz.find().skip(skipCount).limit(10);//skip upto skipCount and show the next 10;

    return res.status(200).json({
      status: 'success',
      quizzes,
      quizDay: user.quizDay,
      userId:user._id,
      quizCompleted:false 
    });
  } catch (error) {
    console.error('Error in /daily route:', error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};



//Function to get the quizzzes
// exports.getQuizzes=async(req,res)=>{
//     try{
//         const quizzes=await Quiz.find().limit(10);
//         res.status(200).json({
//             status:'success',
//             quizzes 
//         })
//     }
//     catch(err){
//         res.status(500).json({
//             status:'fail',
//             message:err.message 
//         })
//     }
// }

export const getPoints=async(req,res)=>{
    try{
        // const userId=req?.user?._id || "68955900ea39ddff800e24ba";
        const userId=req.query.userId;
        if(!userId){
          return res.status(400).json({
            status:'fail',
            message:'User ID is required'
          })
        }
        const user=await User.findById(userId).select('points');//fetches only the points field from the user. 
        if(!user){
          return res.status(404).json({
            status:'fail',
            message:'User not found'
          });
        }

        res.status(200).json({
            status:'success',
            points:user.points
        });
    }
    catch(err){
        res.status(500).json({
            status:'fail',
            message:err.message 
        });
    }
}