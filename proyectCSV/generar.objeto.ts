const fs = require('fs');
const path = require('path');


// Leer el archivo CSV
const csvPath = path.join(__dirname, 'departamentos.municipios.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parsear el CSV
const lines = csvContent.trim().split('\n');

// Si no hay líneas, abortar
if (lines.length === 0) {
  throw new Error("El archivo CSV está vacío.");
}

// Detectar delimitador
const delimiter: string = lines[0].includes(';') ? ';' : ',';
console.log(`Usando delimitador: "${delimiter}"`);

const data: string[] = lines.slice(1); // Saltar headers

// Crear el objeto resultado
const departamentosData: Record<string, any> = {};

data.forEach((line: string) => {
  const values: string[] = line.split(delimiter);

  // Validar que tenemos exactamente 6 columnas
  if (values.length !== 6) {
    console.warn(`⚠ Línea inválida (no tiene 6 columnas): ${line}`);
    return;
  }

  // Desestructurar con tipado de tupla (garantiza que son 6 strings)
  const [
    codigo_departamentoRaw,
    departamentoRaw,
    codigo_municipioRaw,
    municipioRaw,
    longitudRaw,
    latitudRaw
  ]: [string, string, string, string, string, string] = values as [string, string, string, string, string, string];

  // Normalizar strings
  const codigo_departamento = codigo_departamentoRaw.trim();
  const departamento = departamentoRaw.trim();
  const codigo_municipio = codigo_municipioRaw.trim();
  const municipio = municipioRaw.trim();

  // Reemplazar coma decimal → punto
  const longitud = longitudRaw.trim().replace(',', '.');
  const latitud = latitudRaw.trim().replace(',', '.');

  // Crear departamento si no existe
  if (!departamentosData[departamento]) {
    departamentosData[departamento] = {
      codigo_departamento,
      municipios: {}
    };
  }

  // Agregar municipio
  departamentosData[departamento].municipios[municipio] = {
    codigo: codigo_municipio,
    lat: parseFloat(latitud),
    lon: parseFloat(longitud),
  };
});

// Generar el contenido del archivo TypeScript
const tsContent = `export const departamentos = ${JSON.stringify(departamentosData, null, 2)} as const;`;

// Escribir el archivo index.ts
const outputPath = path.join(__dirname, 'index.ts');
fs.writeFileSync(outputPath, tsContent, 'utf-8');

console.log('✅ Archivo index.ts generado exitosamente!');
console.log(`Departamentos procesados: ${Object.keys(departamentosData).length}`);