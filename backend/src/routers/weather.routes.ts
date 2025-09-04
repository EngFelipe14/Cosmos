import { Router } from "express";
import { validateMunicipality } from "../middlewares/validate-municipio.middleware.ts";
import { getWeatherCurrentController, getWeatherForecastController } from "../controllers/weather.controller.ts";

const router = Router();

/**
 * Rutas para obetner el clima y pronóstico.
 *
 * @route GET /api/clima/actual
 * @route GET /api/clima/pronostico
*/
router.get('/actual',
    validateMunicipality,          // Middleware para validar el código del municipio.    
    getWeatherCurrentController    // Controlador que maneja la petición del clima actual.
)

router.get('/pronostico',
    validateMunicipality,           // Middleware para validar el código del municipio.
    getWeatherForecastController);  // Controlador que maneja la petición del pronóstico
export default router;