const foodModel = require("../models/food.model");
const likesModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid(),
  );

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
    address: req.body.address,
  });

  res.status(201).json({
    message: "Food item created successfully",
    food: foodItem,
  });
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({});
  res.status(200).json({
    message: "Food items retrieved sucessfully",
    foodItems,
  });
}

async function likeFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likesModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadyLiked) {
    await likesModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: -1 },
    });

    return res.status(200).json({
      message: "food unliked sucessfully",
    });
  }

  const like = await likesModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 },
  });

  res.status(201).json({
    message: "Food item liked successfully",
    like,
  });
}

async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadySaved) {
    await saveModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    return res.status(200).json({
      message: "Food item removed from saves successfully",
    });
  }

  const savedFood = await saveModel.create({
    user: user._id,
    food: foodId,
  });

  res.status(201).json({
    message: "Food item saved successfully",
    savedFood,
  });
}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
};
