import type { Request, Response, NextFunction } from "express";

/**
 * Middleware para validar que el request contenga un id_token de Google.
 *
 * @function validateGoogleToken
 * @param {Request} req - Objeto de la petición HTTP.
 * @param {Response} res - Objeto de la respuesta HTTP.
 * @param {NextFunction} next - Función para pasar al siguiente middleware.
 * @returns {void} Si falta el id_token responde con un 400, de lo contrario continúa.
*/
export const validateGoogleToken = (req: Request, res: Response, next: NextFunction) => {
  const { id_token } = req.body;

  if (!id_token) return res.status(400).json({ message: "Falta el id token" });

  next();
}

