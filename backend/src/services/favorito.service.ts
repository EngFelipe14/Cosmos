import { FavoritoRepository } from '../repositories/favorito.repository.ts';
import { findMunicipalityByCode } from '../repositories/municipio.repository.ts';

export const toggleFavoritoService = async (userId: number, codigo: string, favorito: boolean) => {
  const municipio = await findMunicipalityByCode(codigo);
  if (!municipio) {
    throw new Error('Municipio no encontrado');
  }

  if (favorito) {
    await FavoritoRepository.upsert(userId, municipio.id);
    return { municipio_id: municipio.id };
  } else {
    await FavoritoRepository.delete(userId, municipio.id);
    return { success: true };
  }
};