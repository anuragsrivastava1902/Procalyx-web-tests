import fs from 'fs';
import Papa from 'papaparse';

export function readCSV(filePath) {
  const file = fs.readFileSync(filePath, 'utf8');

    // turns rows into objects
  return Papa.parse(file, {
    header: true,    // use header as key
    skipEmptyLines: true
  }).data;
}
