import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Atlas connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Docker API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    api: "healthy",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
});