import Router from "express";
const router = new Router();
import applicationController from "../controllers/applicationController.js";


router.get("/control", applicationController.getStatus);

export default router;
