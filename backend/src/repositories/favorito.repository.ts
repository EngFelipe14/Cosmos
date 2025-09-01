import pool from "../configs/db.ts";

export const viewFavoriteMunicipality = async (userId: number): Promise<number> => {
  const query = 'SELECT municipio_id FROM Favorito WHERE usuario_id = $1';
  const result = await pool.query(query, [userId]);
  return result.rows[1];
}

export const FavoritoRepository = {
  async upsert(usuarioId: number, municipioId: number): Promise<void> {
    const query = ` INSERT INTO Favorito (usuario_id, municipio_id, principal) VALUES ($1, $2, true) ON CONFLICT (usuario_id) DO UPDATE  SET municipio_id = EXCLUDED.municipio_id, principal = true `;
    await pool.query(query, [usuarioId, municipioId]);
  },

  async delete(usuarioId: number, municipioId: number): Promise<void> {
    const query = `DELETE FROM Favorito WHERE usuario_id = $1 AND municipio_id = $2`;
    await pool.query(query, [usuarioId, municipioId]);
  }
};