import express from "express";
import type { Application} from "express";
import authRoutes from "./routers/auth.routes.ts";
import { config } from "./configs/env.ts";
import weatherRoutes from './routers/weather.routes.ts';
import favoriteRoutes from './routers/favorito.routes.ts';

const app: Application = express();
app.use(express.json());

const PORT = config.PORT || 3000;
app.listen(PORT, (): void => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.use("/api/auth/google", authRoutes);
app.use("/api/clima", weatherRoutes);
app.use('/api/', favoriteRoutes);