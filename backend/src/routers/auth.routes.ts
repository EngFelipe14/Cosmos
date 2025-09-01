import { Router } from "express";
import { validateGoogleToken} from "../middlewares/googleAuth.middleware.ts";
import { googleAuthController, logoutController } from "../controllers/auth.controller.ts";
import { verifyJWT } from "../middlewares/validate-jwt.middleware.ts";

const router = Router();

router.post("/google",
    validateGoogleToken,
    googleAuthController);

router.post("/logout",
    verifyJWT,
    logoutController);

export default router;
