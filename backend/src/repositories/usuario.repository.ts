import type { Usuario } from "../models/usuario.model.ts";
import pool from "../configs/db.ts";


/**
 * Busca un usuario en la base de datos por su identificador único de Google (sub).
 *
 * @async
 * @function findGoogleSub
 * @param {string} sub - Identificador único asignado por Google al usuario.
 * @returns {Promise<Usuario|null>} El usuario encontrado o `null` si no existe.
*/
export const findGoogleSub = async (sub: string): Promise<Usuario | null> => {
    const result = await pool.query<Usuario>('SELECT * FROM usuario WHERE google_sub = $1',
        [sub]
    );

    return  result.rows[0] || null;
}

export interface CreateUserParams {
    google_sub: string,
    email: string,
    name: string
}
/**
 * Crea un nuevo usuario en la base de datos con la información de Google.
 *
 * @async
 * @function createUser
 * @param {CreateUserParams} params - Objeto con los datos del nuevo usuario.
 * @param {string} params.google_sub - Identificador único de Google.
 * @param {string} params.email - Correo electrónico del usuario.
 * @param {string} params.name - Nombre del usuario.
 * @returns {Promise<Usuario>} El usuario recién creado.
*/
export const createUser = async ({google_sub, email, name}: CreateUserParams): Promise<Usuario> => {
    const result = await pool.query('INSERT INTO usuario (google_sub, email, nombre, fecha_creacion) VALUES ($1, $2, $3, NOW()) RETURNING *',
        [google_sub, email, name]
    )

    return result.rows[0];
}
