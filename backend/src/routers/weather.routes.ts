import { Router } from "express";
import { validateMunicipality } from "../middlewares/validate-municipio.middleware.ts";
import { getWeatherCurrentController, getWeatherForecastController } from "../controllers/weather.controller.ts";

const router = Router();

router.get('/actual',
    validateMunicipality,
    getWeatherCurrentController
)

router.get('/pronostico',
    validateMunicipality,
    getWeatherForecastController);
export default router;