import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { departamentos } from './data.departamento.municipio.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, 'insert.municipios.individual.sql');

const inserts: string[] = [];

for (const [departamento, depData] of Object.entries(departamentos)) {
  const codDepartamento = depData.codigo_departamento;

  for (const [municipio, munData] of Object.entries(depData.municipios)) {
    const codMunicipio = munData.codigo;
    const latitud = munData.lat;
    const longitud = munData.lon;

    const municipioEscapado = municipio.replace(/'/g, "''");
    const departamentoEscapado = departamento.replace(/'/g, "''");

    const insert = `INSERT INTO Municipio (municipio, cod_municipio, departamento, cod_departamento, latitud, longitud)\n` +
      `VALUES ('${municipioEscapado}', ${codMunicipio}, '${departamentoEscapado}', ${codDepartamento}, ${latitud}, ${longitud});`;

    inserts.push(insert);
  }
}
const fileContent = inserts.join('\n\n') + '\n';

fs.writeFileSync(outputPath, fileContent, 'utf-8');

console.log(`✅ Archivo insert_municipios_individual.sql generado con ${inserts.length} INSERTS individuales`);