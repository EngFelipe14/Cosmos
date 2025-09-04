import type { Municipio } from '../models/municipio.model.ts';
import pool from '../configs/db.ts';

/**
 * Busca un municipio en la base de datos por su código oficial.
 *
 * @async
 * @function findMunicipalityByCode
 * @param {string} code - Código oficial del municipio.
 * @returns {Promise<Municipio|null>} Municipio con id, latitud y longitud o `null` si no existe.
*/
export const findMunicipalityByCode = async (code: string): Promise<Municipio> => {
  const query = `SELECT id, latitud, longitud FROM Municipio WHERE cod_municipio = $1`;
  const result = await pool.query(query, [code]);

  return result.rows[0] || null;
}

/**
 * Busca las coordenadas de un municipio en la base de datos por su código.
 *
 * @async
 * @function findMunicipalityById
 * @param {number} municipalityId - Código del municipio (columna cod_municipio).
 * @returns {Promise<Municipio|null>} Objeto municipio con latitud y longitud o `null` si no existe.
*/
export const findMunicipalityById = async (municipalityId: number): Promise<Municipio> => {
  const query = `SELECT latitud, longitud FROM Municipio WHERE cod_municipio = $1`;
  const result = await pool.query(query, [municipalityId]);

  return result.rows[0] || null;
}

