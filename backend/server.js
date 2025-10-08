//this is the main entry point of the backend server

const express=require('express');

const dotenv=require('dotenv'); 
dotenv.config();
const port=process.env.PORT || 5000;
const db= require("./config/db")
const auth = require("./routes/auth");
const schoolRoutes = require("./routes/schoolRoutes");  
const cors = require("cors");
const cookieParser = require("cookie-parser");
const principalRoutes= require("./routes/principalRoutes");
const teacherRoutes= require("./routes/teacherRoutes");
const uploadRoutes=require("./routes/uploadRoutes");
const announcementRoutes= require("./routes/announcementRoutes")
const teacherDetailsRoutes=require("./routes/teacherDetailsRoutes");
const showAnnouncementRoute=require("./routes/showAnnouncementRoute");
const studentRoutes=require("./routes/studentRoutes");
const uploadLogoRoutes=require("./routes/uploadLogoRoutes");
const testRoutes=require("./routes/testRoutes");

const app=express()

app.use(cookieParser());


app.use(
  cors({
    origin: "http://localhost:3000",  //must be exact origin
    credentials: true,                 // allow cookies
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

//app.use("/api/forgot-password", auth);

//owner->Creating schools and  CRUD operations on school
app.use("/api/school", schoolRoutes);

//display principal and school details on principal dashboard
app.use("/api/principal", principalRoutes);

// Serve static files (logos)
app.use("/uploads", express.static("uploads"), principalRoutes);


//principal adding teachers and performing all CRUD opeartion
app.use("/api/teachers", teacherRoutes);

//principal or teacher both can create student
app.use("/api/student", studentRoutes);

//display teacher and school details on teacher dashboard
app.use("/api/teacherDetails", teacherDetailsRoutes);

//teahers creating tests
app.use("/api/test", testRoutes);

//csv file upload route
app.use("/api/upload",uploadRoutes);

//upload school logo on principal's dashboard
app.use("/api/upload-logo",uploadLogoRoutes)

//principal's announcement route
app.use("/api/announcement",announcementRoutes);

//view announcement for teacher and student as notification
app.use("/api/showAnnouncement", showAnnouncementRoute)




// Start the server

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})