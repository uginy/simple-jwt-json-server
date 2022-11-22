import { Router } from "express";
const router = new Router();
import mainRouter from "./mainRouter.js";
import systemRouter from "./systemRouter.js";
import applicationRouter from "./applicationRouter.js";
import recorderRouter from "./recorderRouter.js";
import hotkeysRouter from "./hotkeysRouter.js";
import calibrationRouter from "./calibrationRouter.js";
import smartShutterRouter from "./smartShutterRouter.js";
import staticShutterRouter from "./staticShutterRouter.js";
import v2iRouter from "./v2iRouter.js";

router.use("/main", mainRouter);
router.use("/system", systemRouter);
router.use("/application", applicationRouter);
router.use("/record", recorderRouter);
router.use("/preview", hotkeysRouter);
router.use("/geometric_calibration", calibrationRouter);
router.use("/smart_shutter", smartShutterRouter);
router.use("/static_shutter", staticShutterRouter);
router.use("/v2i", v2iRouter);

export default router;
