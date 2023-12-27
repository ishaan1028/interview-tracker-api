const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const interviewRoutes = require("./routes/interview.route");
const authRoutes = require("./routes/auth.route");

async function main() {
  try {
    const MONGO_URL = "mongodb://127.0.0.1:27017/interview-tracker";

    console.log("Connecting to mongo...");

    await mongoose.connect(process.env.MONGO_URL || MONGO_URL);

    console.log("Connected to mongo!");

    const app = express();

    app.use(cors());

    app.use(express.json());

    app.use("/api/", authRoutes);
    app.use("/api/interview", interviewRoutes);

    app.get("/", (req, res) => res.send("welcome to interview-tracker API!"));

    app.listen(process.env.PORT || 3001, () => {
      console.log("Server running at 3001!");
    });
  } catch (err) {
    console.error("something went wrong", err);
    throw err;
  }
}

main();
