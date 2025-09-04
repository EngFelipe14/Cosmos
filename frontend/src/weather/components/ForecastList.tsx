import { Card, CardContent, Grid, Typography } from "@mui/material";

/**
 * Lista que muestra los próximos días del pronóstico del clima.
 *
 * @component
 * @param {{ forecast: any }} props - Objeto con el pronóstico retornado por el backend.
*/
export function ForecastList({ forecast }: { forecast: any }) {
  return (
    <Card sx={{ mt: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Pronóstico para {forecast.ciudad}
        </Typography>
        <Grid container spacing={2}>
          {forecast.pronostico.slice(0, 5).map((f: any, i: number) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={{ bgcolor: "#e3f2fd" }}>
                <CardContent>
                  <Typography variant="body2">{f.fecha}</Typography>
                  <Typography>🌡️ {f.temperatura}°C</Typography>
                  <Typography variant="body2">💧 {f.humedad}%</Typography>
                  <Typography variant="body2">☁️ {f.descripcion}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
