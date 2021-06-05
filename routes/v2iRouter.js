const Router = require("express");
const router = new Router();
const v2iController = require("../controllers/v2iController");

router.post("/settings", v2iController.setSettings);
router.get("/settings", v2iController.getSettings);

module.exports = router;