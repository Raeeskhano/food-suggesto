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

// GET /api/food/... [protected Api]

module.exports = router;
