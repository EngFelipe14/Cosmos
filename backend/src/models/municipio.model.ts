export interface Municipio {
  id: number;
  municipio?: string;
  cod_municipio?: number | null;
  departamento?: string;
  cod_departamento?: number | null;
  latitud: number;
  longitud: number;
}