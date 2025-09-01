import type { Request, Response } from 'express';
import { getWeatherCurrent } from '../services/weather.service.ts';
import { getWeatherForecast } from '../services/weather.service.ts';

export const getWeatherCurrentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { codigo } = req.query;

    const result = await getWeatherCurrent( codigo as string);

    res.status(200).json(result);

  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error consultando clima' });
  }
};

export const getWeatherForecastController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { codigo } = req.query;

    const result = await getWeatherForecast(codigo as string);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error consultando pronóstico' });
  }
};