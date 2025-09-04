import { useState } from "react";
import type { Municipio } from "../models/municipio.model.ts";
import { fetchWeather, fetchForecast } from "../services/weather.service.ts";

/**
 * ViewModel para la búsqueda de clima.
 *
 * - Gestiona el municipio seleccionado.
 * - Llama a los servicios de clima y pronóstico.
 * - Expone el estado y acciones necesarias para la vista.
*/
export function useSearchViewModel() {
  const [selectedMunicipio, setSelectedMunicipio] = useState<Municipio | null>(null);
  const [weather, setWeather] = useState<any | null>(null);
  const [forecast, setForecast] = useState<any | null>(null);

  const handleSearch = async () => {
    if (!selectedMunicipio) return;
    try {
      const codigo = selectedMunicipio.codigo_municipio;
      const [climaActual, climaPronostico] = await Promise.all([
        fetchWeather(codigo),
        fetchForecast(codigo),
      ]);
      setWeather(climaActual);
      setForecast(climaPronostico);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    selectedMunicipio,
    setSelectedMunicipio,
    weather,
    forecast,
    handleSearch,
  };
}
