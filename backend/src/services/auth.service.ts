import { OAuth2Client } from "google-auth-library";
import { config } from '../configs/env.ts';
import { findGoogleSub, createUser } from "../repositories/usuario.repository.ts";
import type { Usuario } from "../models/usuario.model.ts";
import { createToken } from "../utils/jwt.utils.ts";
import { viewFavoriteMunicipality } from "../repositories/favorito.repository.ts";
import { findValidByMunicipio } from "../repositories/obsevacion-clima.repository.ts";
import { requestWeatherCurrent } from "../utils/openweather.utils.ts";
import { findMunicipalityById } from "../repositories/municipio.repository.ts";


const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

export async function loginWithGoogle(idToken: string) {

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
  if (!idMunicipalityFavoite) return { token, user: { id: user.id, email: user.email, name: user.name, picture } };;

  const dataMunicipality = await findValidByMunicipio(idMunicipalityFavoite);
  if (dataMunicipality) return { token, dataMunicipality, user: { id: user.id, email: user.email, name: user.name, picture } };

  const coordinates = await findMunicipalityById(idMunicipalityFavoite);
  const clima = await requestWeatherCurrent(coordinates.latitud, coordinates.longitud, idMunicipalityFavoite);

  return { token, clima, user: { id: user.id, email: user.email, name: user.name, picture } };
}