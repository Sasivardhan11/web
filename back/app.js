import  express,{ response } from "express";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userdt from './signindata';
import nodemailer from "nodemailer"
import send from "./sendmail";
import Comment from "./problemtext";
import multer from "multer";
import product from "./product";

const app = express();
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://sasivardhan11:219O6aMhhexcA4XT@mywebsite1.snflh1e.mongodb.net/Mywebsite1?retryWrites=true&w=majority')
.then(() => app.listen(4000))
.then(() =>
console.log("Connected to Database & Listining to localhost 4000")
)
.catch((err) => console.log(err));

// bus
app.post('/signin',(req,res,next)=>{
    console.log(req.body.formdata);
    const {fname,lname,username,password,Cpassword}=req.body.formdata;
    const udt =new userdt({
        fname,
        lname,
        username,
        password,
        Cpassword
    })
    try{
        udt.save();
    }
    catch(err){
        console.log(err);
    }
    return res.send({msg:"inserted",result:udt});
})
//Add problem text
app.post('/addText',(req,res,next)=>{
    console.log(req.body.formdata);
    const {comments}=req.body.formdata;
    const tex =new Comment({
        comments
    })
    try{
        tex.save();
    }
    catch(err){
        console.log(err);
    }
    return res.send({msg:"inserted",result:tex});
})
//add image
//products

//products

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './images')
    },
    filename: function (req, file, callback) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      callback(null, Date.now()+"_"+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  //add product 
  app.post("/addproduct",upload.single("myfile"),async(req, res, next)=>{
    const productpic=(req.file)? req.file.filename:null
    //console.log(req.body.formdata)
    // const {title,price,category} =req.body
    const prod = new product({
        // title,
        // price,
        // category,
        productpic,
      })
    try{
        prod.save()//for saving the data into the database
        return res.status(200).json({ message: 'image added successfully' });
    }catch(err){
           return res.status(400).json({message:"not uploaded"})
    }      
})


//sending sign in data 
app.get('/getsignindata',async(req,res,next)=>{
    let userdata;
    try{
        userdata = await userdt.find()
    }
    catch(err){
        console.log(err)
    }
    if(!userdata){
        console.log("no User Found")
    }
    return res.status(200).json({userdata})
})
app.post("/addForm",(req,res,next)=>{
    console.log(req.body.formdata)
    const {name,email,comments}= req.body.formdata
    const smail = new send({
        name,
        email,
        comments
    })
    try{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'kushalvuppala@gmail.com',
              pass: 'jgzw eeoq iuxe tmyg'
            }});
          
          var mailOptions = {
            from: 'kushalvuppala@gmail.com',
            to: email,
            subject: 'sending mails to rectify problems to be solved',
            text: 'Thanks '+name+' for your valuable Feedback we will soon recify your problem. '+comments
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          
    }
    catch{
        alert("Error")
        window.location.reload;
    }
    return res.send({msg:"Inserted",result:smail})
})