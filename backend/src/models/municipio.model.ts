/**
 * Representa un municipio en Colombia con sus datos geográficos
 * y de identificación administrativa.
 */
export interface Municipio {
  /** Identificador único del municipio en la base de datos */
  id: number;

  /** Nombre del municipio */
  municipio?: string;

  /** Código oficial del municipio */
  cod_municipio?: number | null;

  /** Nombre del departamento al que pertenece el municipio */
  departamento?: string;

  /** Código oficial del departamento */
  cod_departamento?: number | null;

  /** Latitud geográfica del municipio */
  latitud: number;

  /** Longitud geográfica del municipio */
  longitud: number;
}
