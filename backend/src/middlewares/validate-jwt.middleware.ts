import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { config } from "../configs/env.ts";

/**
 * Middleware para verificar la validez de un JWT enviado en los headers.
 *
 * @function verifyJWT
 * @param {Request} req - Objeto de la petición HTTP, se agrega la propiedad `user` si el token es válido.
 * @param {Response} res - Objeto de la respuesta HTTP.
 * @param {NextFunction} next - Función para pasar al siguiente middleware.
 * @returns {void} Si el token no existe o es inválido responde con un 401, de lo contrario continúa.
*/
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