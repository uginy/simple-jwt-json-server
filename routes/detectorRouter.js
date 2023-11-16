import Router from "express";
const router = new Router();
import detectorController from "../controllers/detectorController.js";

router.get("/multiclass", detectorController.getMulticlass);
router.get("/segmentation", detectorController.getSegmentation);
router.get("/fcw", detectorController.getFcw);
router.get("/v2i", detectorController.getV2i);

router.post("/multiclass", detectorController.updateMulticlass);
router.post("/segmentation", detectorController.updateSegmentation);
router.post("/fcw", detectorController.updateFcw);
router.post("/v2i", detectorController.updateV2i);

export default router;
