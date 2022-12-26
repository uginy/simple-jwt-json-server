import Router from "express";
const router = new Router();
import detectorController from "../controllers/detectorController.js";

router.post("/settings", detectorController.setSettings);
router.get("/settings", detectorController.getSettings);

export default router;
