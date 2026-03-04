const foodPartnerModel = require("../models/foodpartner.model");

const getFoodPartnerById = async (req, res) => {
  const foodPartnerId = req.params.id;

  const foodPartner = await foodPartnerModel.findById(foodPartnerId);
  const foodItemsByFoodPartner = await foodPartnerModel.find({
    foodpartner: foodPartnerId,
  });

  if (!foodPartner) {
    return res.status(404).json({ message: "food partner not found" });
  }

  res.status(200).json({
    message: "food partner found",
    foodPartner: {
      ...foodPartner.toObject(),
      foodItems: foodItemsByFoodPartner,
    },
  });
};

module.exports = {
  getFoodPartnerById,
};
