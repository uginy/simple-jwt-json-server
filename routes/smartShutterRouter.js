const Router = require("express");
const router = new Router();
const smartShutterController = require("../controllers/smartShutterController");

router.post("/settings", Router.text(), smartShutterController.setSettings);
router.post("/manual", smartShutterController.setManual);
router.get("/settings", Router.text(), smartShutterController.getSettings);

module.exports = router;