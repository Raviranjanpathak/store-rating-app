const { Store, Rating, sequelize } = require("../models");

// ✅ GET STORES (Optimized + Avg + User Rating)
exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      attributes: {
        include: [
          [
            sequelize.fn("AVG", sequelize.col("Ratings.rating")),
            "avgRating",
          ],
        ],
      },
      include: [
        {
          model: Rating,
          attributes: ["rating", "user_id"],
        },
      ],
      group: ["Store.id", "Ratings.id"],
      order: [["name", "ASC"]],
    });

    const result = stores.map((store) => {
      const ratings = store.Ratings;

      const userRatingObj = ratings.find(
        (r) => r.user_id === req.user.id
      );

      return {
        ...store.toJSON(),
        avgRating: Number(
          parseFloat(store.dataValues.avgRating || 0).toFixed(1)
        ),
        userRating: userRatingObj ? userRatingObj.rating : null,
      };
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};

// ⭐ ADD / UPDATE RATING
exports.addRating = async (req, res) => {
  try {
    const { store_id, rating } = req.body;

    // ✅ Validation
    if (!store_id || rating == null) {
      return res.status(400).json({ msg: "All fields required" });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({
        msg: "Rating must be an integer between 1 and 5",
      });
    }

    // 🔍 Check existing rating
    let existing = await Rating.findOne({
      where: { user_id: req.user.id, store_id },
    });

    if (existing) {
      existing.rating = rating;
      await existing.save();

      return res.json({
        msg: "Rating updated",
        rating: existing,
      });
    }

    const newRating = await Rating.create({
      user_id: req.user.id,
      store_id,
      rating,
    });

    res.json({
      msg: "Rating added",
      rating: newRating,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};