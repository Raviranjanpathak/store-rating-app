const router = require("express").Router();
const auth = require("../middleware/authMiddleware"); // ✅ ADD THIS

const {
  signup,
  login,
  updatePassword
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.put("/update-password", auth(["user", "owner"]), updatePassword);

module.exports = router;