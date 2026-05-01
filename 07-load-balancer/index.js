import express from "express";
import os from "os";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const hostname = os.hostname();
  res.send(`Hello from Ahmad Abuzaid! This is a load balancer example.`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
