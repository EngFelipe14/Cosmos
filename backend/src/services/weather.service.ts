import { findMunicipalityByCode } from '../repositories/municipio.repository.ts';
import { findValidByMunicipio, upsertWeather } from '../repositories/obsevacion-clima.repository.ts';
import type { CreateObservacionClima } from '../models/observacion-clima.model.ts';
import { config } from '../configs/env.ts';

const API_KEY = config.OPENWEATHER_KEY;

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

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${API_KEY}&lang=es&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en API OpenWeather: ${response.statusText}`);
    }

    const data = await response.json();

    const clima: CreateObservacionClima = {
      municipio_id: id,
      temperatura: data.main?.temp ?? null,
      humedad: data.main?.humidity ?? null,
      presion: data.main?.pressure ?? null,
      velocidad_viento: data.wind?.speed ?? null,
      direccion_viento: data.wind?.deg?.toString() ?? null,
      descripcion_clima: data.weather?.[0]?.description ?? null,
      icono_clima: data.weather?.[0]?.icon ?? null,
      lluvia_1h: data.rain?.['1h'] ?? null,
      lluvia_3h: data.rain?.['3h'] ?? null,
      nubes: data.clouds?.all ?? null,
      uv_index: null,
      visibilidad: data.visibility ?? null,
      sensacion_termica: data.main?.feels_like ?? null,
    };

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

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&appid=${API_KEY}&lang=es&units=metric`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error consultando OpenWeather');
  }

  const data = await response.json();

  const forecast = data.list.map((item: any) => ({
    fecha: item.dt_txt,
    temperatura: item.main.temp,
    sensacion_termica: item.main.feels_like,
    humedad: item.main.humidity,
    descripcion: item.weather[0].description,
    icono: item.weather[0].icon,
    viento: {
      velocidad: item.wind.speed,
      direccion: item.wind.deg,
    },
    nubes: item.clouds.all,
    lluvia_3h: item.rain?.['3h'] ?? 0
  }));

  return {
    ciudad: data.city.name,
    pais: data.city.country,
    pronostico: forecast
  };
};