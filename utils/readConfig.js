// utils/readConfig.js
import fs from 'fs';

export function readConfig(role) {
  try {
    const config = JSON.parse(fs.readFileSync('config/app.config.json', 'utf-8'));
    if (!role) {
      throw new Error('❌ ROLE env variable is required (e.g. ROLE=admin)');
    }
    // Basic validation of config file structure
    if (!config.baseURL || !config.users) {
      throw new Error("Config file missing required fields: baseURL or loginEmail");
    }
    const user = config.users[role];

    if (!user) {
      throw new Error(`❌ Role "${role}" not found in config`);
    }
    
    return {
      baseURL: config.baseURL.qa,
      email: user.email,
    };
  } catch (err) {
    console.error("Error reading config file:", err.message);
    throw err;
  }
}
