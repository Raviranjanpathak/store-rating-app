const { User, Store, Rating } = require("../models");

// 👥 GET USERS WITH OWNER RATING
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    const stores = await Store.findAll();
    const ratings = await Rating.findAll();

    const result = users.map(user => {
      let ownerRating = null;

      if (user.role === "owner") {
        const store = stores.find(s => s.owner_id === user.id);

        if (store) {
          const storeRatings = ratings.filter(
            r => r.store_id === store.id
          );

          ownerRating =
            storeRatings.length > 0
              ? (
                  storeRatings.reduce((sum, r) => sum + r.rating, 0) /
                  storeRatings.length
                ).toFixed(1)
              : 0;
        }
      }

      return {
        ...user.toJSON(),
        ownerRating: Number(ownerRating),
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📊 DASHBOARD
exports.dashboard = async (req, res) => {
  try {
    const users = await User.count();
    const stores = await Store.count();
    const ratings = await Rating.count();

    res.json({ users, stores, ratings });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//
// ➕ ADD STORE (FIX ADDED)
//
exports.addStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;

    const store = await Store.create({
      name,
      email,
      address,
      owner_id,
    });

    res.json(store);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//
// 🏪 GET STORES (FIX ADDED)
//
exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: [{ model: Rating, attributes: ["rating"] }],
    });

    const result = stores.map((store) => {
      const ratings = store.Ratings;

      const avg =
        ratings.length > 0
          ? (
              ratings.reduce((sum, r) => sum + r.rating, 0) /
              ratings.length
            ).toFixed(1)
          : 0;

      return {
        ...store.toJSON(),
        avgRating: Number(avg),
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};