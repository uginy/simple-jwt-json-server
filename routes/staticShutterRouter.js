import Router from "express";
const router = new Router();
import staticShutterController from "../controllers/staticShutterController.js";

router.post("/settings", staticShutterController.setSettings);
router.get("/settings", staticShutterController.getSettings);

export default router;
