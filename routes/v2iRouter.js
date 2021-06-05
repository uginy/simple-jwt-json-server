import Router from "express";
const router = new Router();
import v2iController from "../controllers/v2iController.js";

router.post("/settings", v2iController.setSettings);
router.get("/settings", v2iController.getSettings);

export default router;
