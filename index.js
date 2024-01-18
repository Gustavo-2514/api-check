require("dotenv").config();
const connectDB = require("./src/database/database");
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./src/routes/authRoute");
const checklistRoute = require("./src/routes/checklistRoute");
const taskRoute = require("./src/routes/taskRoute");

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(express.json());

app.use("/", authRoute);
app.use("/", checklistRoute);
app.use("/", taskRoute);

app.listen(5000, () => {
  connectDB;
  console.log("Server is running on port 5000");
});
