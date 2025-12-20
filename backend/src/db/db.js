const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDb connected");
    })
    .catch((err) => {
      console.log("failed to connect MongoDb", err);
    });
}

module.exports = connectDb;
