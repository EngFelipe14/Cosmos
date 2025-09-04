import type { Request, Response } from 'express';
import { getWeatherCurrent } from '../services/weather.service.ts';
import { getWeatherForecast } from '../services/weather.service.ts';

/**
 * Controlador que obtiene el clima actual de un municipio.
 *
 * @async
 * @function getWeatherCurrentController
 * @param {Request} req - Petición HTTP con `codigo` como query param.
 * @param {Response} res - Respuesta HTTP con el resultado o error.
 * @returns {Promise<void>} Responde con el clima actual en formato JSON.
*/
export const getWeatherCurrentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { codigo } = req.query;

    const result = await getWeatherCurrent( codigo as string);

    res.status(200).json(result);

  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error consultando clima' });
  }
};

/**
 * Controlador que obtiene el pronóstico climático de un municipio.
 *
 * @async
 * @function getWeatherForecastController
 * @param {Request} req - Petición HTTP con `codigo` como query param.
 * @param {Response} res - Respuesta HTTP con el resultado o error.
 * @returns {Promise<void>} Responde con el pronóstico en formato JSON.
*/
export const getWeatherForecastController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { codigo } = req.query;

    const result = await getWeatherForecast(codigo as string);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error consultando pronóstico' });
  }
};