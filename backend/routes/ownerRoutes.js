const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const { dashboard } = require("../controllers/ownerController");

router.get("/dashboard", auth(["owner"]), dashboard);

module.exports = router;