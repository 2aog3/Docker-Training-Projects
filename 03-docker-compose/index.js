import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send(
    "Hello World! This is a Docker Compose example. \n" +
      "The server is running and connected to MongoDB.\n" +
      "I NEED TO SLEEP ASAP.",
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
