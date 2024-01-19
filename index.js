require("dotenv").config();
const connectDB = require("./src/database/database");
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./src/routes/authRoute");
const checklistRoute = require("./src/routes/checklistRoute");
const taskRoute = require("./src/routes/taskRoute");

app.use(cors({ credentials: true, origin: "https://check-to-do-list-delta.vercel.app", }));
// app.use(cors())
app.use(express.json());

app.get('/',(req,res)=>{
  res.status(200).json("Hello")
})
app.use("/", authRoute);
app.use("/", checklistRoute);
app.use("/", taskRoute);

const PORT = process.env.PORT || 5000

app.listen(PORT , () => {
  connectDB;
  console.log(`Server is running ${PORT}`);
});
