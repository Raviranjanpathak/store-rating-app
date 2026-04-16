const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const { getStores, addRating } = require("../controllers/userController");

router.get("/stores", auth(["user"]), getStores);
router.post("/rate", auth(["user"]), addRating);

module.exports = router;