require("dotenv").config();
const express = require ("express");
const { connectDB } = require("./src/config/db");
const cloudinary= require("cloudinary").v2;
const cors=require("cors");
const ownerRouter = require("./src/api/routes/owner");
const petRouter = require("./src/api/routes/pet");




const app = express();

connectDB();


cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
})

app.use(cors());
app.use(express.json());

app.use("/api/v1/owners",ownerRouter);
app.use("/api/v1/pets", petRouter);

app.use((req,res,next)=>{
  return res.status(400).json("Route not found");
});

app.listen(3000, ()=>{
  console.log("Servidor desplegado en http://localhost:3000");
  })