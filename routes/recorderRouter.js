import Router from "express";
const router = new Router();
import recorderController from "../controllers/recorderController.js";

router.get("/state", recorderController.getRecordingState);
router.post("/state", recorderController.updateRecordingState);
router.post("/profile", Router.text(), recorderController.updateProfile);
router.get("/profile", recorderController.getProfile);

export default router;
