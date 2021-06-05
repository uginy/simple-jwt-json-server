import Router from "express";
const router = new Router();
import componentsController from "../controllers/componentsController.js";

router.get("/components", componentsController.getComponents);
router.get("/about", componentsController.getAbout);

export default router;
