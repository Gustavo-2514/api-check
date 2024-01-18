const mongoose = require("mongoose");

module.exports = mongoose
  .connect(
    `mongodb+srv://admin:${process.env.DB_PASS}@applications.c5gbjcz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
