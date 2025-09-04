//this is the main entry point of the backend server

const express=require('express');
const app=express()
const dotenv=require('dotenv'); 
dotenv.config();
const port=process.env.PORT || 5000;
const db= require("./config/db")
const auth = require("./routes/auth");
const cors = require("cors");
const cookieParser = require("cookie-parser");


app.use(cookieParser());

// app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000",  // ✅ must be exact origin
    credentials: true,                 // ✅ allow cookies
  })
);

db.connect();

app.use(express.json())

app.get('/',(req,res)=>{
    console.log(req.body);
    res.send('Hello World!')
}   )

// Import routes

app.use("/api/auth", auth);

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})