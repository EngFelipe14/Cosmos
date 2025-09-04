import type { Request, Response } from 'express';
import { toggleFavoritoService } from '../services/favorito.service.ts';

/**
 * Controlador para manejar el "toggle" de favoritos de un municipio.
 *
 * - Si `favorito` es true → inserta o actualiza el favorito.
 * - Si `favorito` es false → elimina el favorito.
 *
 * @async
 * @function toggleFavoritoController
 * @param {Request} req - Objeto de la petición HTTP. 
 *   - body: { code: string, favorito: boolean }
 *   - user: { userId: number } (inyectado por `verifyJWT`)
 * @param {Response} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Respuesta JSON con el resultado de la operación.
*/
export const toggleFavoritoController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, favorito } = req.body; 
    const userId = req.user?.userId; 

    if (!userId) throw new Error('Es necesario el id del usuario.')

    const result = await toggleFavoritoService(userId, code, favorito);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error al manejar favorito' });
  }
};