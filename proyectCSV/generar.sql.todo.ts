import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
// Importar los datos
import { departamentos } from './data.departamento.municipio.ts'; // Nota: .js en ESM

// Emular __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta de salida para el archivo SQL
const outputPath = path.join(__dirname, 'insert.municipios.todo.sql');

// Array para ir guardando los VALUES
const values: string[] = [];

// Recorrer departamentos y municipios
for (const [departamento, depData] of Object.entries(departamentos)) {
  const codDepartamento = depData.codigo_departamento;

  for (const [municipio, munData] of Object.entries(depData.municipios)) {
    const codMunicipio = munData.codigo;
    const latitud = munData.lat;
    const longitud = munData.lon;

    // Escapar comillas simples en los nombres (por si acaso)
    const municipioEscapado = municipio.replace(/'/g, "''");
    const departamentoEscapado = departamento.replace(/'/g, "''");

    // Generar el VALUE (sin INSERT, solo los valores)
    const value = `  ('${municipioEscapado}', ${codMunicipio}, '${departamentoEscapado}', ${codDepartamento}, ${latitud}, ${longitud})`;

    values.push(value);
  }
}

// Crear el INSERT masivo
const fileContent = `INSERT INTO Municipio (municipio, cod_municipio, departamento, cod_departamento, latitud, longitud)\nVALUES\n${values.join(',\n')};\n`;

// Escribir archivo
fs.writeFileSync(outputPath, fileContent, 'utf-8');

console.log(`✅ Archivo insert_municipios_bulk.sql generado con ${values.length} registros en un solo INSERT`);