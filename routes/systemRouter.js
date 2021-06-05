import Router from "express";
const router = new Router();
import systemController from "../controllers/systemController.js";

router.post("/settings", systemController.setSettings);
router.get("/settings", systemController.getSettings);
router.get("/status", systemController.getStatus);
router.get("/detailed_log", systemController.getDetailedLog);

export default router;
