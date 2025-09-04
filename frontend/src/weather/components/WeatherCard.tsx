import { Card, CardContent, Typography, Stack } from "@mui/material";
import { Thermostat, WaterDrop, Air, Compress, Visibility, Explore, DeviceThermostat, WbCloudy } from "@mui/icons-material";

/**
 * Tarjeta que muestra el clima actual de un municipio.
 *
 * @component
 * @param {{ weather: any, municipio: string }} props - Datos del clima y nombre del municipio.
 */
export function WeatherCard({ weather, municipio }: { weather: any; municipio: string }) {
  return (
    <Card sx={{ mt: 2, p: 2, bgcolor: "#f0f4f8" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Clima actual en {municipio}
        </Typography>

        <Stack spacing={1}>
          <Typography><Thermostat fontSize="small" /> Temperatura: {weather.temperatura}°C</Typography>
          <Typography><WaterDrop fontSize="small" /> Humedad: {weather.humedad}%</Typography>
          <Typography><Compress fontSize="small" /> Presión: {weather.presion} hPa</Typography>
          <Typography><Air fontSize="small" /> Velocidad del viento: {weather.velocidad_viento} km/h</Typography>
          <Typography><Explore fontSize="small" /> Dirección del viento: {weather.direccion_viento}</Typography>
          <Typography><Visibility fontSize="small" /> Visibilidad: {weather.visibilidad} km</Typography>
          <Typography><DeviceThermostat fontSize="small" /> Sensación térmica: {weather.sensacion_termica}°C</Typography>
          <Typography><WbCloudy fontSize="small" /> {weather.descripcion_clima}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
