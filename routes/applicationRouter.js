import Router from "express";
const router = new Router();
import applicationController from "../controllers/applicationController.js";


router.get("/control", applicationController.getStatus);
router.get("/camera_logs", applicationController.getCameraLog);
router.post("/camera_logs", applicationController.requestCameraLog);

export default router;
