import type { Request, Response } from "express";
import { justifyText } from "../services/justify.service.js";
import { incrementUsage } from "../utils/Limiter.js";

export function justifyController(req: Request, res: Response) {
  const text = req.body as string;
  if (typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ error: "Text body is required" });
  }

  const words = text.split(/\s+/).filter(Boolean).length;
  const token = (req as any).token;

  const canUse = incrementUsage(token, words);
  if (!canUse) {
    return res.status(402).json({
      error: "Paiement requis : limite quotidienne de mots dépassée (80 000 mots/jour)",
    });
  }

  const justified = justifyText(text);
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.send(justified);
}
