import { upsert, Delete } from '../repositories/favorito.repository.ts';
import { findMunicipalityByCode } from '../repositories/municipio.repository.ts';

/**
 * Servicio que maneja la lógica de favoritos.
 *
 * - Valida que el municipio exista.
 * - Si `favorito` es true → inserta o actualiza el favorito del usuario.
 * - Si `favorito` es false → elimina el municipio de los favoritos.
 *
 * @async
 * @function toggleFavoritoService
 * @param {number} userId - ID del usuario autenticado.
 * @param {string} codigo - Código del municipio.
 * @param {boolean} favorito - Indica si se agrega (true) o elimina (false).
 * @returns {Promise<{municipio_id?: number, success?: boolean}>}
 *   - { municipio_id } cuando se agrega.
 *   - { success: true } cuando se elimina.
 * @throws {Error} Si el municipio no existe.
*/
export const toggleFavoritoService = async (userId: number, codigo: string, favorito: boolean): Promise<{municipio_id?: number, success?: boolean}> => {
  const municipio = await findMunicipalityByCode(codigo);
  if (!municipio) {
    throw new Error('Municipio no encontrado');
  }

  if (favorito) {
    await upsert(userId, municipio.id);
    return { municipio_id: municipio.id };
  } else {
    await Delete(userId, municipio.id);
    return { success: true };
  }
};