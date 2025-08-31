import jwt from 'jsonwebtoken';
import { config } from '../configs/env.ts';

interface DataToken {
    userId: number,
    email: string
}

export const createToken = ({userId, email}: DataToken): string => {
    const token = jwt.sign({ userId, email }, config.JWT_SECRET, { expiresIn: '1d' });

    return token;
}