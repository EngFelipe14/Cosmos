/**
 * Representa un municipio de Colombia
 */
export type Municipio = {
  /** Código único del municipio */
  codigo_municipio: string;
  /** Nombre del municipio */
  municipio: string;
  /** Nombre del departamento al que pertenece */
  departamento: string;
  /** Latitud geográfica */
  lat: number;
  /** Longitud geográfica */
  lng: number;
};
