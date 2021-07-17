import Router from "express";
const router = new Router();
import systemController from "../controllers/systemController.js";

router.post("/settings", systemController.setSettings);
router.get("/settings", systemController.getSettings);
router.get("/status", systemController.getStatus);
router.post("/status", systemController.sendCommand);
router.post("/detailed_logs", systemController.requestDetailedLog);
router.get("/detailed_logs", systemController.getDetailedLog);
router.post("/sw_upgrade", systemController.swUpgrade);

export default router;
