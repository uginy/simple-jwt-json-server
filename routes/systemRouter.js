const Router = require("express");
const router = new Router();
const componentsController = require("../controllers/componentsController");

router.post("/settings", componentsController.setSettings);
router.get("/settings", componentsController.getSettings);

module.exports = router;