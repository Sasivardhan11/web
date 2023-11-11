// schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;
let mail=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    comments:{
        type:String,
        required:true
    }
});

export default mongoose.model("send",mail);
// export default mongoose.model("collectionName",SchemaVariableName);