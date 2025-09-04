/**
 * Representa una observación climática almacenada en el sistema.
 * Se guarda en la base de datos a partir de la API de OpenWeather
 * o del caché interno para un municipio específico.
 */
export interface ObservacionClima {
  /** Identificador único de la observación */
  id: number;

  /** Municipio al que pertenece la observación */
  municipio_id: number;

  /** Marca de tiempo en la que se registró la observación */
  timestamp: Date;

  /** Temperatura en grados Celsius */
  temperatura: number | null;

  /** Humedad relativa en porcentaje */
  humedad: number | null;

  /** Presión atmosférica en hPa */
  presion: number | null;

  /** Velocidad del viento en m/s */
  velocidad_viento: number | null;

  /** Dirección del viento en grados (°) */
  direccion_viento: string | null;

  /** Descripción general del clima (ej: "lluvia ligera") */
  descripcion_clima: string | null;

  /** Código del ícono del clima según OpenWeather */
  icono_clima: string | null;

  /** Cantidad de lluvia en la última hora (mm) */
  lluvia_1h: number | null;

  /** Cantidad de lluvia en las últimas 3 horas (mm) */
  lluvia_3h: number | null;

  /** Porcentaje de nubosidad */
  nubes: number | null;

  /** Índice UV estimado */
  uv_index: number | null;

  /** Visibilidad en metros */
  visibilidad: number | null;

  /** Sensación térmica en grados Celsius */
  sensacion_termica: number | null;
}


/**
 * Datos necesarios para crear una nueva observación climática.
 * Similar a `ObservacionClima` pero sin campos generados automáticamente
 * como `id` y `timestamp`.
 */
export interface CreateObservacionClima {
  /** Municipio asociado a la observación */
  municipio_id: number | null;

  /** Temperatura en grados Celsius */
  temperatura: number | null;

  /** Humedad relativa en porcentaje */
  humedad: number | null;

  /** Presión atmosférica en hPa */
  presion: number | null;

  /** Velocidad del viento en m/s */
  velocidad_viento: number | null;

  /** Dirección del viento en grados (°) */
  direccion_viento: string | null;

  /** Descripción general del clima (ej: "cielo claro") */
  descripcion_clima: string | null;

  /** Código del ícono del clima según OpenWeather */
  icono_clima: string | null;

  /** Cantidad de lluvia en la última hora (mm) */
  lluvia_1h: number | null;

  /** Cantidad de lluvia en las últimas 3 horas (mm) */
  lluvia_3h: number | null;

  /** Porcentaje de nubosidad */
  nubes: number | null;

  /** Visibilidad en metros */
  visibilidad: number | null;

  /** Sensación térmica en grados Celsius */
  sensacion_termica: number | null;
}

