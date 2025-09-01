import type { Request, Response, NextFunction } from "express";

export const validateGoogleToken = (req: Request, res: Response, next: NextFunction) => {
  const { id_token } = req.body;

  if (!id_token) return res.status(400).json({ message: "Falta el id token" });

  next();
}

