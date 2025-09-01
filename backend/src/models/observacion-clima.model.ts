export interface ObservacionClima {
  id: number;
  municipio_id: number;
  timestamp: Date;
  temperatura: number | null;
  humedad: number | null;
  presion: number | null;
  velocidad_viento: number | null;
  direccion_viento: string | null;
  descripcion_clima: string | null;
  icono_clima: string | null;
  lluvia_1h: number | null;
  lluvia_3h: number | null;
  nubes: number | null;
  uv_index: number | null;
  visibilidad: number | null;
  sensacion_termica: number | null;
}

export interface CreateObservacionClima {
  municipio_id: number;
  temperatura: number | null;
  humedad: number | null;
  presion: number | null;
  velocidad_viento: number | null;
  direccion_viento: string | null;
  descripcion_clima: string | null;
  icono_clima: string | null;
  lluvia_1h: number | null;
  lluvia_3h: number | null;
  nubes: number | null;
  uv_index: number | null;
  visibilidad: number | null;
  sensacion_termica: number | null;
}