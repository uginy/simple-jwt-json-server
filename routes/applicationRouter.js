import Router from "express";
const router = new Router();
import applicationController from "../controllers/applicationController.js";


router.get("/control", applicationController.getStatus);
router.get("/detailed_logs", applicationController.getCameraLog);
router.post("/detailed_logs", applicationController.requestCameraLog);
router.post("/shutdown", applicationController.shutdown);

export default router;
