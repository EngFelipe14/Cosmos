import jwt from 'jsonwebtoken';
import { config } from '../configs/env.ts';

interface DataToken {
    userId: number,
    email: string
}

/**
 * Genera un JSON Web Token (JWT) para un usuario autenticado.
 *
 * @function createToken
 * @param {DataToken} data - Datos para firmar el token.
 * @param {number} data.userId - ID del usuario.
 * @param {string} data.email - Correo electrónico del usuario.
 * @returns {string} Token JWT válido por 1 día.
*/
export const createToken = ({userId, email}: DataToken): string => {
    const token = jwt.sign({ userId, email }, config.JWT_SECRET, { expiresIn: '1d' });

    return token;
}