import mongoose from "mongoose";
const Schema=mongoose.Schema
const product =new Schema({
    
    productpic:{
        type:String,
        required:true
    }
   
})
export default  mongoose.model('products',product)