import pool from '../configs/db.ts';
import type { ObservacionClima, CreateObservacionClima } from '../models/observacion-clima.model.ts';

export const findValidByMunicipio = async (municipalityId: number): Promise<ObservacionClima | null> => {
  const query = `SELECT * FROM Observacion_clima WHERE municipio_id = $1 AND timestamp >= (NOW() - INTERVAL '30 minutes') LIMIT 1;`;
  const result = await pool.query(query, [municipalityId]);
  return result.rows[0] || null;
}

export const upsertWeather = async(municipioId: number, data: CreateObservacionClima): Promise<void> => {
  const query = `
    INSERT INTO Observacion_clima (
      municipio_id, timestamp, temperatura, humedad, presion, velocidad_viento,
      direccion_viento, descripcion_clima, icono_clima, lluvia_1h, lluvia_3h,
      nubes, uv_index, visibilidad, sensacion_termica
    )
    VALUES (
      $1, NOW(), $2, $3, $4, $5,
      $6, $7, $8, $9, $10,
      $11, $12, $13, $14
    )
    ON CONFLICT (municipio_id)
    DO UPDATE SET
      timestamp = NOW(),
      temperatura = EXCLUDED.temperatura,
      humedad = EXCLUDED.humedad,
      presion = EXCLUDED.presion,
      velocidad_viento = EXCLUDED.velocidad_viento,
      direccion_viento = EXCLUDED.direccion_viento,
      descripcion_clima = EXCLUDED.descripcion_clima,
      icono_clima = EXCLUDED.icono_clima,
      lluvia_1h = EXCLUDED.lluvia_1h,
      lluvia_3h = EXCLUDED.lluvia_3h,
      nubes = EXCLUDED.nubes,
      uv_index = EXCLUDED.uv_index,
      visibilidad = EXCLUDED.visibilidad,
      sensacion_termica = EXCLUDED.sensacion_termica;
  `;
  const values = [
    municipioId,
    data.temperatura, data.humedad, data.presion, data.velocidad_viento,
    data.direccion_viento, data.descripcion_clima, data.icono_clima,
    data.lluvia_1h, data.lluvia_3h,
    data.nubes, data.uv_index, data.visibilidad, data.sensacion_termica
  ];
  await pool.query(query, values);
}

