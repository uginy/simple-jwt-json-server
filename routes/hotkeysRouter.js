import Router from "express";
const router = new Router();
import hotkeysController from "../controllers/hotkeysController.js";

router.post("/hotkeys", Router.text(), hotkeysController.hotkeys);

export default router;
