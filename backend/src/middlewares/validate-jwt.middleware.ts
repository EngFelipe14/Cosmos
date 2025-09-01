import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { config } from "../configs/env.ts";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) return res.status(401).json({message: 'Se necesita el token'});

    const decoded = jwt.verify(token, config.JWT_SECRET) as {userId: number, email: string};
    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado"});
  }
}