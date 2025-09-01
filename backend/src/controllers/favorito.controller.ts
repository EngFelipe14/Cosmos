import type { Request, Response } from 'express';
import { toggleFavoritoService } from '../services/favorito.service.ts';

export const toggleFavoritoController = async (req: Request, res: Response) => {
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