import type { Request, Response, NextFunction } from 'express';

/**
 * Middleware que valida el parámetro `codigo` en la query de la petición.
 *
 * - Debe existir y ser de tipo string.
 * - Debe cumplir con el formato numérico (1 a 10 dígitos).
 *
 * @function validateMunicipality
 * @param {Request} req - Objeto de la petición Express.
 * @param {Response} res - Objeto de la respuesta Express.
 * @param {NextFunction} next - Función para pasar al siguiente middleware.
 * @returns {void} Si la validación falla, responde con un error 400.
*/
export const validateMunicipality = ( req: Request, res: Response, next: NextFunction): void => {
  const { codigo } = req.query;

  if (!codigo || typeof codigo !== 'string') {
    res.status(400).json({
      error: 'El parámetro codigo es requerido y debe ser string',
    });
    return;
  }

  const codigoRegex = /^\d{1,10}$/;
  if (!codigoRegex.test(codigo.trim())) {
    res.status(400).json({
      error: 'El parámetro codigo debe ser un número válido',
    });
    return;
  }

  req.query.codigo = codigo.trim();

  next();
};
