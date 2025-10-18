import { Router } from "express";
import { justifyController } from "../controllers/justify.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/", authMiddleware, justifyController);  // POST "/" sur "/api/justify"
export default router;
