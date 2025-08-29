import express from "express";
import type { Application, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config({ path: '../.env' });
const app: Application = express();

app.use(express.json());

app.get("/prueba", (request: Request, response: Response) => {
    response.json({message: "prueba exitosa"})
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (): void => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
