const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const adminController = require("../controllers/adminController");



router.post("/add-store", auth(["admin"]), adminController.addStore);
router.get("/dashboard", auth(["admin"]), adminController.dashboard);
router.get("/users", auth(["admin"]), adminController.getUsers);
router.get("/stores", auth(["admin"]), adminController.getStores);

module.exports = router;