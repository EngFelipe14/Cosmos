import { findMunicipalityByCode } from '../repositories/municipio.repository.ts';
import { findValidByMunicipio, upsertWeather } from '../repositories/obsevacion-clima.repository.ts';
import { requestWeatherCurrent, requestWeatherForecast } from '../utils/openweather.utils.ts';

export const  getWeatherCurrent = async(municipalityCode: string) => {
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

export const getWeatherForecast = async (municipalityCode: string) => {
  const municipality = await findMunicipalityByCode(municipalityCode);
  if (!municipality) {
    throw new Error(`Municipio no encontrado con código: ${municipalityCode}`);
  }

  const { latitud, longitud } = municipality;

  const forecast = await requestWeatherForecast(latitud, longitud);

  return forecast;
};