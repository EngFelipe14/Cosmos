/**
 * Obtiene el clima actual de un municipio desde el backend.
 *
 * @async
 * @function
 * @param {string} codigo - Código del municipio.
 * @returns {Promise<any>} Datos del clima actual en formato JSON.
 * @throws {Error} Si la petición falla.
*/
export async function fetchWeather(codigo: string) {
  const res = await fetch(`/api/clima/actual?codigo=${codigo}`);
  if (!res.ok) throw new Error("Error obteniendo clima actual");
  return res.json();
}

/**
 * Obtiene el pronóstico del clima de un municipio desde el backend.
 *
 * @async
 * @function
 * @param {string} codigo - Código del municipio.
 * @returns {Promise<any>} Datos del pronóstico en formato JSON.
 * @throws {Error} Si la petición falla.
*/
export async function fetchForecast(codigo: string) {
  const res = await fetch(`/api/clima/pronostico?codigo=${codigo}`);
  if (!res.ok) throw new Error("Error obteniendo pronóstico");
  return res.json();
}
