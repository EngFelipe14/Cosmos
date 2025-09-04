import { findMunicipalityByCode } from '../repositories/municipio.repository.ts';
import { findValidByMunicipio, upsertWeather } from '../repositories/obsevacion-clima.repository.ts';
import { requestWeatherCurrent, requestWeatherForecast } from '../utils/openweather.utils.ts';
import type { CreateObservacionClima } from '../models/observacion-clima.model.ts';

/**
 * Obtiene el clima actual de un municipio.
 *
 * - Busca el municipio en base de datos por código.
 * - Revisa si hay observación en caché (últimos 30 minutos).
 * - Si no hay, consulta la API de OpenWeather.
 * - Guarda o actualiza el clima en la base de datos.
 *
 * @async
 * @function getWeatherCurrent
 * @param {string} municipalityCode - Código del municipio.
 * @returns {Promise<CreateObservacionClima>} Clima actual.
 * @throws {Error} Si el municipio no existe o falta su ID.
*/
export const  getWeatherCurrent = async(municipalityCode: string): Promise<CreateObservacionClima> => {
  const municipality = await findMunicipalityByCode(municipalityCode);
  if (!municipality) {
    throw new Error(`Municipio no encontrado con código: ${municipalityCode}`);
  }

  const { latitud, longitud, id } = municipality;

  if (!id) throw new Error("Id del municipio necesario")

  const climaCache = await findValidByMunicipio(id);
  if (climaCache) {
    return climaCache;
  }

  const clima = await requestWeatherCurrent(latitud, longitud, id);

  try {
    await upsertWeather(id, clima);
  } catch (err) {
    console.error('Error guardando observación clima:', err);
  }

  return clima;
}

/**
 * Obtiene el pronóstico climático de un municipio a partir de sus coordenadas.
 *
 * @async
 * @function getWeatherForecast
 * @param {string} municipalityCode - Código del municipio.
 * @returns {Promise<any>} Pronóstico climático estructurado por intervalos de 3h.
 * @throws {Error} Si el municipio no existe.
*/
export const getWeatherForecast = async (municipalityCode: string): Promise<any> => {
  const municipality = await findMunicipalityByCode(municipalityCode);
  if (!municipality) {
    throw new Error(`Municipio no encontrado con código: ${municipalityCode}`);
  }

  const { latitud, longitud } = municipality;

  const forecast = await requestWeatherForecast(latitud, longitud);

  return forecast;
};