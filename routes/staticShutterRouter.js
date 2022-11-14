import Router from "express";
const router = new Router();
import staticShutterController from "../controllers/staticShutterController.js";

router.post("/settings", Router.text(), staticShutterController.setSettings);
router.get("/settings", Router.text(), staticShutterController.getSettings);

export default router;
