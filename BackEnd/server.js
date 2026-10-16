
const express = require("express");

const app = express();

const PORT = 5000;

// Middleware to read JSON data
app.use(express.json());

// Home API route
app.get("/", (req, res) => {
  res.send("VOID District Backend Server is Running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`VOID District Server running on http://localhost:${PORT}`);
});
