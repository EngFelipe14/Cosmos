import type { Usuario } from "../models/usuario.model.ts";
import pool from "../configs/db.ts";



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

export const createUser = async ({google_sub, email, name}: CreateUserParams): Promise<Usuario> => {
    const result = await pool.query('INSERT INTO usuario (google_sub, email, nombre, fecha_creacion) VALUES ($1, $2, $3, NOW()) RETURNING *',
        [google_sub, email, name]
    )

    return result.rows[0];
}
