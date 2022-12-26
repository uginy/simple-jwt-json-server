import { Router } from "express";
const router = new Router();
import systemRouter from "./systemRouter.js";

router.use("/", systemRouter);


export default router;
