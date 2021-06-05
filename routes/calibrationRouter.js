import Router from "express";
const router = new Router();
import calibrationController from "../controllers/calibrationController.js";

router.post("/set_point_type", Router.text(), calibrationController.setPointType);
router.post("/point_location", calibrationController.setPointLocation);
router.post("/marking", Router.text(), calibrationController.setMarkingType);
router.get("/state", calibrationController.getState);

export default router;
