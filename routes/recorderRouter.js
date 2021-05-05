const Router = require("express");
const router = new Router();
const recorderController = require("../controllers/recorderController");

router.post("/start_stop", recorderController.startStop);
router.post("/profile", recorderController.updateProfile);
router.get("/profile", recorderController.getProfile);

module.exports = router;