const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//Middleware must come BEFORE routes
app.use(cors());
app.use(express.json());

//Database
const connectDB = require("./config/db");
connectDB();

//Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const transactionRoutes = require("./routes/transactionRoutes");
app.use("/api/transactions", transactionRoutes);


app.get("/", (req, res) => {
  res.send("FinTrack Backend Running...");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
