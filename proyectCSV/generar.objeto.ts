const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, 'departamentos.municipios.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

const lines = csvContent.trim().split('\n');

if (lines.length === 0) {
  throw new Error("El archivo CSV está vacío.");
}

const delimiter: string = lines[0].includes(';') ? ';' : ',';
console.log(`Usando delimitador: "${delimiter}"`);

const data: string[] = lines.slice(1);

// Crear el objeto resultado
const departamentosData: Record<string, any> = {};

data.forEach((line: string) => {
  const values: string[] = line.split(delimiter);

  if (values.length !== 6) {
    console.warn(`⚠ Línea inválida (no tiene 6 columnas): ${line}`);
    return;
  }

  const [
    codigo_departamentoRaw,
    departamentoRaw,
    codigo_municipioRaw,
    municipioRaw,
    longitudRaw,
    latitudRaw
  ]: [string, string, string, string, string, string] = values as [string, string, string, string, string, string];

  const codigo_departamento = codigo_departamentoRaw.trim();
  const departamento = departamentoRaw.trim();
  const codigo_municipio = codigo_municipioRaw.trim();
  const municipio = municipioRaw.trim();

  const longitud = longitudRaw.trim().replace(',', '.');
  const latitud = latitudRaw.trim().replace(',', '.');

  if (!departamentosData[departamento]) {
    departamentosData[departamento] = {
      codigo_departamento,
      municipios: {}
    };
  }

  departamentosData[departamento].municipios[municipio] = {
    codigo: codigo_municipio,
    lat: parseFloat(latitud),
    lon: parseFloat(longitud),
  };
});

const tsContent = `export const departamentos = ${JSON.stringify(departamentosData, null, 2)} as const;`;

const outputPath = path.join(__dirname, 'index.ts');
fs.writeFileSync(outputPath, tsContent, 'utf-8');

console.log('✅ Archivo index.ts generado exitosamente!');
console.log(`Departamentos procesados: ${Object.keys(departamentosData).length}`);