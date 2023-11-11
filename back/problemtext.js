// schema
// import mongoose from "mongoose";
// const Schema = mongoose.Schema;
// let ptext=new Schema({
//     comments:{
//         type:String,
//         required:true
//     }
// });

// export default mongoose.model("co",ptext);
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ptextSchema = new Schema({
    comments: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model('Comment', ptextSchema); // Change the model name to "Comment"

export default Comment; // Export the model with the corrected name
