const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1000 * 1024 * 1024 },
});

// POST /api/food/... [protected Api] means only foodpartner can access this API.
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

// GET /api/food/... [protected Api] this is for Users

router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);

// GET /api/food/... [protected Api] this is for users to like food items
router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likeFood,
);

// POST /api/food/... [protected Api] this is for users to save food items
router.post(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.saveFood,
);

// GET /api/food/save [protected Api] this is for users to retrieve saved food items
router.get(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.getSaveFood,
);

module.exports = router;
