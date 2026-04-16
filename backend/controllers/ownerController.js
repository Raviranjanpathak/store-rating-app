const { Rating, Store, User } = require("../models");
const { Sequelize } = require("sequelize");

exports.dashboard = async (req, res) => {
  try {
    const store = await Store.findOne({
      where: { owner_id: req.user.id },
    });

    if (!store) {
      return res.json({ ratings: [], avgRating: 0 });
    }

    const ratings = await Rating.findAll({
      where: { store_id: store.id },
      include: [{ model: User, attributes: ["name", "email"] }],
    });

    const avg = await Rating.findAll({
      where: { store_id: store.id },
      attributes: [
        [Sequelize.fn("AVG", Sequelize.col("rating")), "avgRating"],
      ],
      raw: true,
    });

    res.json({
      ratings,
      avgRating: avg[0]?.avgRating || 0,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};