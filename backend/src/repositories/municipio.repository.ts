import type { Municipio } from '../models/municipio.model.ts';
import pool from '../configs/db.ts';


export const findMunicipalityByCode = async (code: string): Promise<Municipio> => {
  const query = `SELECT id, latitud, longitud FROM Municipio WHERE cod_municipio = $1`;
  const result = await pool.query(query, [code]);

  return result.rows[0] || null;
}

export const findMunicipalityById = async (municipalityId: number): Promise<Municipio> => {
  const query = `SELECT latitud, longitud FROM Municipio WHERE cod_municipio = $1`;
  const result = await pool.query(query, [municipalityId]);

  return result.rows[0] || null;
}

