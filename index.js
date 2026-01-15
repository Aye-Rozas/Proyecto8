require("dotenv").config();
const express = require ("express");
const { connectDB } = require("./src/config/db");
const cors=require("cors");
const ownerRouter = require("./src/api/routes/owner");
const petRouter = require("./src/api/routes/pet");
const { connectCloudinary } = require("./src/config/cloudinary");

const app = express();

connectDB();

connectCloudinary();

app.use(cors());
app.use(express.json());

app.use("/api/v1/owners",ownerRouter);
app.use("/api/v1/pets", petRouter);

app.use((req,res,next)=>{
  return res.status(404).json("Route not found");
});

app.listen(3000, ()=>{
  console.log("Servidor desplegado en http://localhost:3000");
  })