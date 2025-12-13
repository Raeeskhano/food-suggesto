const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect("mongodb://localhost:27017/food-suggesto")
    .then(() => {
      console.log("MongoDb connected");
    })
    .catch((err) => {
      console.log("failed to connect MongoDb", err);
    });
}

module.exports = connectDb;
