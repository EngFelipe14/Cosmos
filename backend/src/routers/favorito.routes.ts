import { Router } from 'express';
import { verifyJWT } from '../middlewares/validate-jwt.middleware.ts';
import { toggleFavoritoController } from '../controllers/favorito.controller.ts';

const router = Router();

/**
 * Ruta para eliminar o agregar un municipio a favorito.
 *
 * @route POST /api/auth/google/login
*/
router.post('/favorito',
    verifyJWT,                  // Middleware para validar el JWT y ver si el usuario está autenticado.
    toggleFavoritoController    // Controlador que maneja la lógica del municipio favorito
);

export default router;