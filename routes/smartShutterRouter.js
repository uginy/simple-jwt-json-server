import Router from "express";
const router = new Router();
import smartShutterController from "../controllers/smartShutterController.js";

router.post("/settings", Router.text(), smartShutterController.setSettings);
router.post("/manual", smartShutterController.setManual);
router.get("/settings", Router.text(), smartShutterController.getSettings);

export default router;