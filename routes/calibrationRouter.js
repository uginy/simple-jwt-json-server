const Router = require("express");
const router = new Router();
const calibrationController = require("../controllers/calibrationController");

router.post("/set_point_type", Router.text(), calibrationController.setPointType);
router.post("/point_location", calibrationController.setPointLocation);
router.post("/marking", Router.text(), calibrationController.setMarkingType);
router.get("/state", calibrationController.getState);

module.exports = router;