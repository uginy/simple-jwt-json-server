const Router = require("express");
const router = new Router();
const systemController = require("../controllers/systemController");

router.post("/settings", systemController.setSettings);
router.get("/settings", systemController.getSettings);

module.exports = router;