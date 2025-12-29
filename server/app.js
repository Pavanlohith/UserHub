require("dotenv").config();



const express=require('express')
const app=express();
const connectDB = require('./config/db.js'); 
const user=require('./models/register.js')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const cors = require("cors");
const authenticate=require('./middleware/authenticate.js')
const cookieParser = require("cookie-parser");

//connect database
connectDB();
app.use(express.json());
app.use(
  cors({
    origin: "https://userhub-pavanlohith.netlify.app",
    credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);



// app.use(
//   cors({
//     origin: "https://userhub-pavanlohith.netlify.app",
//     credentials: true,
//   })
// );
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       callback(null, true); // allow all origins
//     },
//     credentials: true,
//   })
// );

app.use(cookieParser());

app.post('/api/register', async (req, res) => {
  const { name, email, phone, work, password, cpassword ,profiledescription} = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword || !profiledescription) {
    return res.status(422).json({ error: "Please fill all fields properly" });
  }

  try {
    console.log("Registering user:", req.body);
    const userExist = await user.findOne({ email });
    console.log(userExist);
    if (userExist) {
      return res.status(422).json({ error: "User already exists" });
    }

    const newUser = new user({ name, email, phone, work, password, cpassword, profiledescription });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

//login
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await user.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ error: "User is not registered" });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ Generate token AFTER verification
    const token = await userExist.generateAuthToken();

    // ✅ Set cookie AFTER token is created
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 25896200000000),
      httpOnly: true,
        sameSite: "none",
         secure: true,
    });

    console.log("Login token:", token);

    res.status(200).json({
      message: "User logged in successfully",
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
app.get("/about", authenticate, (req, res) => {
  console.log("about page");
  res.status(200).json(req.rootUser);
});

app.get('/getdata',authenticate,(req,res)=>{
       console.log("about page");
  res.status(200).json(req.rootUser);
  })
  app.post('/contact',authenticate,async(req,res)=>{
    try{
      const {name,email,phone,message}=req.body;      
      if(!name || !email || !phone || !message){
        console.log("Please fill the contact form");
        return res.status(400).json({error:"Please fill the contact form"});
      }
      const userContact=await user.findOne({_id:req.userID});
      if(userContact){
        const userMessage=await userContact.addMessage(name,email,phone,message);
        await userContact.save();
        res.status(201).json({message:"User contact successfully"});
      }
     }catch(err){
      console.log(err);
    }
  });
app.get("/logout", (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
  });

  res.status(200).json({ message: "User logged out successfully" });
});


app.listen(5000,()=>{
    console.log("port connected")
})