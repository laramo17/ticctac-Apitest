import { Router } from "express";
import { createTokenController } from "../controllers/token.controller.js";

const router = Router();

// POST /api/token
router.post("/", createTokenController);// POST "/" sur "/api/token"

export default router;
