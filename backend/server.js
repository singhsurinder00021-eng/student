
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

console.log("JWT_SECRET from env =", process.env.JWT_SECRET); 

const authRoutes = require("./routes/AuthRoutes");
const studentRoutes = require("./routes/studentRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello ✅");
});

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));