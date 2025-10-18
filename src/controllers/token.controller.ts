
import type { Request, Response } from "express";
import { createToken } from "../utils/Limiter.js";


export function createTokenController(req: Request, res: Response) {
  const { email } = req.body;
  // Si aucun email n’est fourni → on renvoie une erreur HTTP 400 
  if (!email) return res.status(400).json({ error: "Missing email" });
  const token = Math.random().toString(36).substring(2, 15);  // On génère un token aléatoire
  const newToken = createToken(email, token);
  res.json(newToken);//renvoie du token sous format JSON
}
