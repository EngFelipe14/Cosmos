import pool from "../configs/db.ts";

export const viewFavoriteMunicipality = async (userId: number): Promise<number> => {
  const query = 'SELECT municipio_id FROM Favorito WHERE usuario_id = $1';
  const result = await pool.query(query, [userId]);
  return result.rows[1];
}