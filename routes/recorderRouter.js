import Router from "express";
const router = new Router();
import recorderController from "../controllers/recorderController.js";

router.post("/start_stop", recorderController.startStop);
router.post("/profile", Router.text(), recorderController.updateProfile);
router.get("/profile", recorderController.getProfile);

export default router;