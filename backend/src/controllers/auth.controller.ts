import type { Request, Response } from "express";
import { loginWithGoogle } from "../services/auth.service.ts";

export async function googleAuthController(req: Request, res: Response) {
  try {
    const { id_token } = req.body;

    const result = await loginWithGoogle(id_token);
    res.json(result);
    
  } catch (error: any) {
    res.status(401).json({ message: "Error en login", error: error.message });
  }
}

export const logoutController = (req: Request, res: Response) => {
  return res.status(200).json({ message: "Sesión cerrada con éxito" });
};