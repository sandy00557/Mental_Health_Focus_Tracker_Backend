import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; //to hash the password
// const bcrypt=require('bcryptjs'); //to hash the password



// const userSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:[true,'User must have a name'],
//         maxlength:20,
//         minlength:6
//     },
//     email:{
//         type:String,
//         required:[true,'User must have an email'],
//         unique:true,
//         lowercase:true,
//     },
//     password:{
//         type:String,
//         required:[true,'Please provide a password'],
//         minlength:6,
//         select:false 
//     },
//     nickname:{
//         type:String,
//         required:false,
//         minlength:2,
//         maxlength:10
//     },
//     focusGoal:{
//         type:String,
//         enum:['Reduce Distractions','Study Better'],
//         default:'Reduce Distractions'
//     },
//     moodGoal:{
//         type:String,
//         enum:['Feel Less Anxious','Sleep Better'],
//         default:'Feel Less Anxious'
//     },
//     language:{
//         type:String,
//         enum:['English','Tamil'],
//         default:'English'
//     },
//     theme:{
//         type:String,
//         enum:['Light','Dark'],
//         default:'Light'
//     },
//     passwordChangedAt:Date,
//     role:{
//         type:String,
//         enum:['user','admin','moderator'],
//         default:'user'
//     }
// });


// //If pre then it will work before saving it in the database
// userSchema.pre('save',async function(next){
//     if(!this.isModified('password')) return next(); //isModified is a predefined method to check if it is changed.
//     /* On first-time signup, password will be hashed because it's considered modified.
// 🛡️ On profile updates (where password is untouched), password won't be rehashed. */
//     this.password=await bcrypt.hash(this.password,12);//"$2b$12$randomsaltandhashedoutput"
//     /*12 is the salt rounds (the number of times it scrambles the password).
//     Higher number = more secure but slower. */

//     next();
// });




// /*what is .methods and what is the difference between .methods and .statics?
// For Eg:Each user(user1,user2,...) is a document.Whole User is a collection.
// If we want methods which should check for each user(user1..) we will use .methods like below as we will check the password for each user.
// If we want to check on whole collection(Look up a user by email from all users) then use .statics 


// Why use .methods and why can't we use like userSchema.corretPassword?
// userSchema is just the blueprint of the model.
// userSchema.correctPassword = ... would attach the method directly to the schema object itself — not to the documents created from it.
// Therefore, you won’t be able to call user.correctPassword(...) on a user document, which is what you usually want for things like password checking.


// why we dont use next() here?
// because it is not a middleware*/
// userSchema.methods.correctPassword=async function(candidatePassword,userPassword){
//     return await bcrypt.compare(candidatePassword,userPassword);
// } //we can call it like await user.correctPassword('secret123',user.password);



// // Check if password was changed after token
// userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
//     return JWTTimestamp < changedTimestamp;
//   }
//   return false;
// };

// const User=mongoose.model('User',userSchema);
// module.exports=User; //finally we should export to make it accessible for other files 




//v2 for GamesSection 

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'User must have a name'],
        maxlength:20,
        minlength:6
    },
    email:{
        type:String,
        required:[true,'User must have an email'],
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength:6,
        select:false 
    },
    nickname:{
        type:String,
        required:false,
        minlength:2,
        maxlength:10
    },
    points:{
        type:Number,
        required:true,
        default:0,
        min:0
    },
    focusGoal:{
        type:String,
        enum:['Reduce Distractions','Study Better'],
        default:'Reduce Distractions'
    },
    moodGoal:{
        type:String,
        enum:['Feel Less Anxious','Sleep Better'],
        default:'Feel Less Anxious'
    },
    language:{
        type:String,
        enum:['English','Tamil'],
        default:'English'
    },
    theme:{
        type:String,
        enum:['Light','Dark'],
        default:'Light'
    },
    passwordChangedAt:Date,
    role:{
        type:String,
        enum:['user','admin','moderator'],
        default:'user'
    },
    firstQuizDate:{
        type:Date //
    },
    lastQuizDate:{
        type:Date,
    },
    quizDay: { 
        type: Number, 
        default: 1 
    },
    lastQuizCompletedDate:{
        type:Date 
    },
    todayQuizCompleted:{
        type:Boolean,
        default:false
    },
    lastChecklistCompletedDate:{
        type:Date ,
        default:null
    },
    productsBought:{
        type:Number,
        default:0
    }
});


//If pre then it will work before saving it in the database
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next(); //isModified is a predefined method to check if it is changed.
    /* On first-time signup, password will be hashed because it's considered modified.
🛡️ On profile updates (where password is untouched), password won't be rehashed. */
    this.password=await bcrypt.hash(this.password,12);//"$2b$12$randomsaltandhashedoutput"
    /*12 is the salt rounds (the number of times it scrambles the password).
    Higher number = more secure but slower. */

    next();
});




/*what is .methods and what is the difference between .methods and .statics?
For Eg:Each user(user1,user2,...) is a document.Whole User is a collection.
If we want methods which should check for each user(user1..) we will use .methods like below as we will check the password for each user.
If we want to check on whole collection(Look up a user by email from all users) then use .statics 


Why use .methods and why can't we use like userSchema.corretPassword?
userSchema is just the blueprint of the model.
userSchema.correctPassword = ... would attach the method directly to the schema object itself — not to the documents created from it.
Therefore, you won’t be able to call user.correctPassword(...) on a user document, which is what you usually want for things like password checking.


why we dont use next() here?
because it is not a middleware*/
userSchema.methods.correctPassword=async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
} //we can call it like await user.correctPassword('secret123',user.password);



// Check if password was changed after token
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User=mongoose.model('User',userSchema); //the code to database collection connection happens here
/*Here we have written User but collection name is "users" how it gets connected?
That is mongoose magic.It will automatically understand and convert User into Users .
also do the naming convention "users" */
// module.exports=User; //finally we should export to make it accessible for other files 

export default User;

