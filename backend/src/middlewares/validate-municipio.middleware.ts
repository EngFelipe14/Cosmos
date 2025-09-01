import type { Request, Response, NextFunction } from 'express';

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
