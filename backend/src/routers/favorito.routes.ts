import { Router } from 'express';
import { verifyJWT } from '../middlewares/validate-jwt.middleware.ts';
import { toggleFavoritoController } from '../controllers/favorito.controller.ts';

const router = Router();

router.post('/favorito',
    verifyJWT,
    toggleFavoritoController
);

export default router;