import mongoose from "mongoose";


const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Product must have a name'],
        minlength:3,
        maxlength:10 
    },
    discountAmount:{
        type:Number,
        required:[true,'Product must have a discount amount'],
        min:1
    },
    Amount:{
        type:Number,
        required:[true,'Product must have an amount'],
        min:2
    },
    rating:{
        type:Number,
        required:[true,'Product must have a rating'],
        min:1,
        max:10
    },
    image:{
        type:String,
        required:[true,'Product must have an image'],
    },
    description:{
        type:String,
        required:[true,'Product must have a description'],
        minlength:10,
        maxlength:50
    },
    bookLink:{
        type:String,
        required:[true,'Product must have a book link']
    },
    motive:{
        type:String,
        required:[true,'Every book must have a motive']
    }
});

const Product=mongoose.model('Product',productSchema);
export default Product;
/*In my mental health tracker app I am planning to store products in the database. Where the product should have name,discountAmount,Amount,rating,image,description related to metnal health foucs tracker.I will just post the data once in the database like 100 product swill be staticllay available in the db and i will use it. The image type I have given is data:Buffer and contenttype:String. The image should also be saved in the db and when if etch the data from the db it should get relfected(imag */