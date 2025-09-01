import dotenv from 'dotenv';

dotenv.config();

interface Config {
    PORT: string | number,
    DB_HOST: string,
    DB_PORT: string | number,
    DB_USER : string,
    DB_PASSWORD : string,
    DB_NAME : string,
    GOOGLE_CLIENT_ID : string,
    GOOGLE_CLIENT_SECRET : string,
    JWT_SECRET: string,
    OPENWEATHER_KEY: string
}

const getEnv = (name: string): string => {
    const env = process.env[name];

    if (!env) {
        throw new Error(`Variable de entorno ${name} está vacía`);
    }
    return env;
}

export const config: Config = {
    PORT : parseInt(getEnv("PORT")),
    DB_HOST : getEnv("DB_HOST"),
    DB_PORT : parseInt(getEnv("DB_PORT")),
    DB_USER : getEnv("DB_USER"),
    DB_PASSWORD : getEnv("DB_PASSWORD"),
    DB_NAME : getEnv("DB_NAME"),
    GOOGLE_CLIENT_ID : getEnv("GOOGLE_CLIENT_ID"),
    GOOGLE_CLIENT_SECRET : getEnv("GOOGLE_CLIENT_SECRET"),
    JWT_SECRET: getEnv("JWT_SECRET"),
    OPENWEATHER_KEY: getEnv("OPENWEATHER_KEY")
}