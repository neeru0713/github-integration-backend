const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes")
require("dotenv").config();



// Middlewares
app.use(cors());
app.use(express.json()); // sufficient for JSON parsing
app.use(bodyParser.json());

app.use("/", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend server is running 🚀");
});

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

// Start server
app.listen(8080, () => {
  console.log("🌐 Server running on http://localhost:8080");
});
