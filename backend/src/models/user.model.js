const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true, //when user was created and when updated last time.
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
