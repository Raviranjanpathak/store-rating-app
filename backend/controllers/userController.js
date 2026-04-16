const { Store, Rating } = require("../models");

//  Get all stores with avg + user rating
exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll();
    const ratings = await Rating.findAll();

    const result = stores.map(store => {
      const storeRatings = ratings.filter(
        r => r.store_id === store.id
      );

      //  Average Rating
      const avgRating =
        storeRatings.length > 0
          ? (
              storeRatings.reduce((sum, r) => sum + r.rating, 0) /
              storeRatings.length
            ).toFixed(1)
          : 0;

      //  Current User Rating
      const userRatingObj = storeRatings.find(
        r => r.user_id === req.user.id
      );

      return {
        ...store.toJSON(),
        avgRating: Number(avgRating),
        userRating: userRatingObj ? userRatingObj.rating : null,
      };
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};



//  Add / Update Rating
exports.addRating = async (req, res) => {
  try {
    const { store_id, rating } = req.body;

    //  Validation
    if (!store_id || !rating) {
      return res.status(400).json({ msg: "All fields required" });
    }

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ msg: "Rating must be between 1 and 5" });
    }

    //  Check if already rated
    const existing = await Rating.findOne({
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

    //  Create new rating
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