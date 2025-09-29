import mongoose from "mongoose";
const quizSchema=new mongoose.Schema({
    questionText:{
        type:String,
        required:true
    },
    options:[{
        type:String,
        required:true
    }],// it is telling that we will have array of options of type String
    answerIndex:{
        type:Number,
        required:true
    }
});

const Quiz=mongoose.model('Quiz',quizSchema);
export default Quiz;