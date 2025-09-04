import { Router } from "express";
import { validateGoogleToken} from "../middlewares/googleAuth.middleware.ts";
import { googleAuthController, logoutController } from "../controllers/auth.controller.ts";
import { verifyJWT } from "../middlewares/validate-jwt.middleware.ts";

const router = Router();

/**
 * Rutas de autenticación con Google.
 *
 * @route POST /api/auth/google/login
 * @route POST /api/auth/google/logout
*/
router.post("/login",
  validateGoogleToken,    // Middleware para validar el id_token de Google
  googleAuthController);  // Controlador que maneja el login con Google

router.post("/logout",
  verifyJWT,              // Middleware para verificar el JWT del usuario
  logoutController);      // Controlador que maneja el cierre de sesión

export default router;
