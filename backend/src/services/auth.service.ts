import { OAuth2Client } from "google-auth-library";
import { config } from '../configs/env.ts';
import { findGoogleSub, createUser } from "../repositories/usuario.repository.ts";
import type { Usuario } from "../models/usuario.model.ts";
import { createToken } from "../utils/jwt.utils.ts";
import { viewFavoriteMunicipality } from "../repositories/favorito.repository.ts";
import { findValidByMunicipio } from "../repositories/obsevacion-clima.repository.ts";
import { requestWeatherCurrent } from "../utils/openweather.utils.ts";
import { findMunicipalityById } from "../repositories/municipio.repository.ts";
import type { Municipio } from "../models/municipio.model.ts";


const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);
const municipalityDC: Municipio = {id: 1, longitud: -74.106992, latitud: 4.649251 };

/**
 * Servicio para manejar el login usando Google OAuth2.
 *
 * Flujo:
 * 1. Verifica el id_token recibido con la API de Google.
 * 2. Extrae la información del usuario (sub, email, nombre, foto).
 * 3. Busca el usuario en la base de datos por `google_sub`:
 *    - Si no existe → lo crea.
 *    - Si existe → lo reutiliza.
 * 4. Genera un JWT propio del sistema.
 * 5. Si el usuario tiene municipios favoritos:
 *    - Devuelve el clima de ese municipio (datos recientes o llamando a OpenWeather).
 * 6. Si no tiene favoritos:
 *    - Devuelve el clima por defecto de Bogotá D.C.
 *
 * @async
 * @function loginWithGoogle
 * @param {string} idToken - Token de Google recibido en el login.
 * @returns {Promise<Object>} Objeto con:
 *   - token {string} JWT generado para el usuario
 *   - clima|dataMunicipality {any} Información climática del municipio favorito o por defecto
 *   - user {Object} Datos del usuario (id, email, nombre, foto)
 * @throws {Error} Si el token de Google no es válido o falta información crítica.
*/
export async function loginWithGoogle(idToken: string): Promise<object> {

  const ticket = await client.verifyIdToken({
    idToken,
    audience: config.GOOGLE_CLIENT_ID
  });

  const payload = ticket.getPayload();
  if (!payload) throw new Error('Token inválido');

  const { sub, email, name, picture } = payload;

  if (!email) throw new Error('Falta el email'); 
  if (!name) throw new Error('Falta el nombre'); 
  
  const result = await findGoogleSub(sub);

  let user: Usuario;

  if (!result) {
    user = await createUser({ google_sub: sub, email, name });
    if (!user) throw new Error('Error al crear el usuario en la base de datos')
  } else {
    user = result;
  }

  const token = createToken({ userId: user.id, email: user.email })
  
  const idMunicipalityFavoite = await viewFavoriteMunicipality(user.id);
  if (idMunicipalityFavoite) {
    const dataMunicipality = await findValidByMunicipio(idMunicipalityFavoite);
    if (dataMunicipality) return { token, dataMunicipality, user: { id: user.id, email: user.email, name: user.name, picture } };

    const coordinates = await findMunicipalityById(idMunicipalityFavoite);
    const clima = await requestWeatherCurrent(coordinates.latitud, coordinates.longitud, idMunicipalityFavoite);

    return { token, clima, user: { id: user.id, email: user.email, name: user.name, picture } };
  }

  const clima = await requestWeatherCurrent(municipalityDC.latitud, municipalityDC.longitud);
  return { token, clima, user: { id: user.id, email: user.email, name: user.name, picture } };
}