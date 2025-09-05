import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { departamentos } from './data.departamento.municipio.ts'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, 'insert.municipios.todo.sql');

const values: string[] = [];

for (const [departamento, depData] of Object.entries(departamentos)) {
  const codDepartamento = depData.codigo_departamento;

  for (const [municipio, munData] of Object.entries(depData.municipios)) {
    const codMunicipio = munData.codigo;
    const latitud = munData.lat;
    const longitud = munData.lon;

    const municipioEscapado = municipio.replace(/'/g, "''");
    const departamentoEscapado = departamento.replace(/'/g, "''");

    const value = `  ('${municipioEscapado}', ${codMunicipio}, '${departamentoEscapado}', ${codDepartamento}, ${latitud}, ${longitud})`;

    values.push(value);
  }
}


const fileContent = `INSERT INTO Municipio (municipio, cod_municipio, departamento, cod_departamento, latitud, longitud)\nVALUES\n${values.join(',\n')};\n`;


fs.writeFileSync(outputPath, fileContent, 'utf-8');

console.log(`✅ Archivo insert_municipios_bulk.sql generado con ${values.length} registros en un solo INSERT`);