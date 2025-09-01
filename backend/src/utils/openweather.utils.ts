import type { CreateObservacionClima } from '../models/observacion-clima.model.ts';
import { config } from '../configs/env.ts';

const API_KEY = config.OPENWEATHER_KEY;

export const requestWeatherCurrent = async (latitud: number, longitud: number, municipalityId: number) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${API_KEY}&lang=es&units=metric`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error en API OpenWeather: ${response.statusText}`);
  }
    
        const data = await response.json();
    
        const clima: CreateObservacionClima = {
          municipio_id: municipalityId,
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
  }

  return clima;
}

export const requestWeatherForecast = async (latitud: number, longitud: number) => {
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
}

