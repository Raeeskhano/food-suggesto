const foodPartnerModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies?.token; // safer access

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access - No token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({
        message: "Invalid token payload",
      });
    }

    const foodPartner = await foodPartnerModel.findById(decoded.id);

    if (!foodPartner) {
      return res.status(401).json({
        message: "Food partner not found",
      });
    }

    req.foodPartner = foodPartner;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

module.exports = {
  authFoodPartnerMiddleware,
};
