import pool from "../configs/db.ts";

/**
 * Obtiene el municipio favorito de un usuario, si existe.
 *
 * @async
 * @function viewFavoriteMunicipality
 * @param {number} userId - ID del usuario en la base de datos.
 * @returns {Promise<number>} ID del municipio favorito o `undefined` si no hay resultados.
*/
export const viewFavoriteMunicipality = async (userId: number): Promise<number> => {
  const query = 'SELECT municipio_id FROM Favorito WHERE usuario_id = $1';
  const result = await pool.query(query, [userId]);
  return result.rows[1];
}


/**
 * Inserta o actualiza el municipio favorito de un usuario.
 *
 * - Si el usuario no tiene un favorito → se inserta uno nuevo.
 * - Si ya existe → se actualiza el municipio marcado como favorito.
 * - Solo un municipio puede estar marcado como principal por usuario.
 *
 * @async
 * @function upsert
 * @param {number} usuarioId - ID del usuario.
 * @param {number} municipioId - ID del municipio a marcar como favorito.
 * @returns {Promise<void>} No retorna nada, solo ejecuta la operación en BD.
*/
export const upsert = async (usuarioId: number, municipioId: number): Promise<void> => {
    const query = ` INSERT INTO Favorito (usuario_id, municipio_id, principal) VALUES ($1, $2, true) ON CONFLICT (usuario_id) DO UPDATE  SET municipio_id = EXCLUDED.municipio_id, principal = true `;
    await pool.query(query, [usuarioId, municipioId]);
  }

/**
 * Elimina un municipio de los favoritos de un usuario.
 *
 * - Solo elimina el municipio específico asociado al usuario.
 * - Si el municipio no está en favoritos, no hace nada.
 *
 * @async
 * @function Delete
 * @param {number} usuarioId - ID del usuario.
 * @param {number} municipioId - ID del municipio a eliminar de favoritos.
 * @returns {Promise<void>} No retorna nada, solo ejecuta la operación en BD.
*/
export const Delete = async (usuarioId: number, municipioId: number): Promise<void> => {
    const query = `DELETE FROM Favorito WHERE usuario_id = $1 AND municipio_id = $2`;
    await pool.query(query, [usuarioId, municipioId]);
}
