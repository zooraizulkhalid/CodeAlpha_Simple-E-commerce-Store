const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Allow local frontend development servers
// Allow frontend to access backend API
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
// Middleware
app.use(express.json());
app.use("/api/products", productRoutes);
// Home Route
app.get("/", (req, res) => {
  res.send("VOID District Backend Server is Running!");
});

// Connect MongoDB and start server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "void_district",
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB Connected Successfully!");

    app.listen(PORT, () => {
      console.log(`VOID District Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
}

startServer();
