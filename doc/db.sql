CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    google_sub VARCHAR(255) NOT NULL,
    nombre VARCHAR(160) NOT NULL,
    fecha_creacion TIMESTAMP
);

CREATE TABLE Municipio (
    id SERIAL PRIMARY KEY,
    municipio VARCHAR(180) NOT NULL,
    cod_municipio INTEGER,
    departamento VARCHAR(120),
    cod_departamento INTEGER,
    latitud DECIMAL(8,7),
    longitud DECIMAL(8,7)
);

CREATE TABLE Observacion_clima (
    id SERIAL PRIMARY KEY,
    municipio_id INTEGER NOT NULL REFERENCES Municipio(id),
    timestamp TIMESTAMP,
    temperatura DECIMAL(5,2),
    humedad DECIMAL(5,2),
    presion DECIMAL(7,2),
    velocidad_viento DECIMAL(5,2),
    direccion_viento VARCHAR(50),
    descripcion_clima VARCHAR(255),
    icono_clima VARCHAR(160),
    lluvia_1h DECIMAL(5,2),
    lluvia_3h DECIMAL(5,2),
    nubes DECIMAL(5,2),
    visibilidad INTEGER,
    sensacion_termica DECIMAL(5,2)
);

CREATE TABLE Suscripcion_alerta (
    usuario_id INTEGER NOT NULL REFERENCES Usuario(id),
    municipio_id INTEGER NOT NULL REFERENCES Municipio(id),
    tipo_alerta VARCHAR(50) NOT NULL,
    umbral DECIMAL(5,2),
    activa BOOLEAN,
    fecha_creacion TIMESTAMP,
    PRIMARY KEY (usuario_id, municipio_id, tipo_alerta)
);

CREATE TABLE Notificacion (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES Usuario(id),
    municipio_id INTEGER NOT NULL REFERENCES Municipio(id),
    mensaje TEXT,
    fecha_envio TIMESTAMP,
    estado VARCHAR(50)
);

CREATE TABLE Favorito (
    usuario_id INTEGER NOT NULL REFERENCES Usuario(id),
    municipio_id INTEGER NOT NULL REFERENCES Municipio(id),
    principal BOOLEAN,
    PRIMARY KEY (usuario_id, municipio_id)
);
