const userModel = require("../models/user.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    "cf32c6c1f816e82be7f6ae7cde68005dd52c3edd"
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user registered successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

module.exports = { registerUser };
