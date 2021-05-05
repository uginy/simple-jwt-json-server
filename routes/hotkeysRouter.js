const Router = require("express");
const router = new Router();
const hotkeysController = require("../controllers/hotkeysController");

router.post("/hotkeys", hotkeysController.hotkeys);

module.exports = router;
