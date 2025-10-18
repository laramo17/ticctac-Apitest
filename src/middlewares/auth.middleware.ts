import type { Request, Response, NextFunction } from "express";
import { getToken } from "../utils/Limiter.js";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing Authorization Bearer token" });
  }

  const parts = auth.split(" ");
  if (parts.length < 2 || !parts[1]) {
    return res.status(401).json({ error: "Invalid Authorization format" });
  }

  const token = parts[1].trim();
  const record = getToken(token);

  if (!record) {
    return res.status(401).json({ error: "Invalid token" });
  }

  (req as any).token = token;
  next();
}
