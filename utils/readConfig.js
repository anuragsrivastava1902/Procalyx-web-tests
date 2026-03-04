// utils/readConfig.js
import fs from 'fs';

export function readConfig(filePath = 'config/app.config.json') {
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const config = JSON.parse(rawData);

    // Basic validation
    if (!config.baseURL || !config.email) {
      throw new Error("Config file missing required fields: baseURL or loginEmail");
    }

    return config;
  } catch (err) {
    console.error("Error reading config file:", err.message);
    throw err;
  }
}
