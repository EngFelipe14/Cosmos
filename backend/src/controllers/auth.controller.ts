import type { Request, Response } from "express";
import { loginWithGoogle } from "../services/auth.service.ts";

/**
 * Controlador para manejar el login con Google.
 *
 * @async
 * @function googleAuthController
 * @param {Request} req - Objeto de la petición HTTP con el `id_token` en el body.
 * @param {Response} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve un JSON con token, datos del usuario y clima.
*/
export async function googleAuthController(req: Request, res: Response): Promise<void> {
  try {
    const { id_token } = req.body;

    const result = await loginWithGoogle(id_token);
    res.json(result);
    
  } catch (error: any) {
    res.status(401).json({ message: "Error en login", error: error.message });
  }
}

/**
 * Controlador para manejar el cierre de sesión del usuario.
 *
 * @function logoutController
 * @param {Request} req - Objeto de la petición HTTP.
 * @param {Response} res - Objeto de la respuesta HTTP.
 * @returns {Response} Mensaje de éxito en formato JSON.
*/
export const logoutController = (req: Request, res: Response) => {
  return res.status(200).json({ message: "Sesión cerrada con éxito" });
};