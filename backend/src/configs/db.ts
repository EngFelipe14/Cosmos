import { Pool } from "pg";
import { config } from "./env.ts";

const pool = new Pool({
    host: config.DB_HOST,
    port: Number(config.DB_PORT) || 5432,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME
});

const testConnection = async (): Promise<void> => {
    try {
        const cliente = await pool.connect();
        console.log("Conexión a PostgreSQL exitosa");
        cliente.release();
    } catch (error) {
        console.error(`Error de conexión a PostgreeSQL. Error: ${error}`);
    }
}

testConnection();
export default pool;


