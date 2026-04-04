// utils/readConfig.js
import fs from 'fs';

export function readConfig(role, environment) {
  try {
    const config = JSON.parse(fs.readFileSync('config/app.config.json', 'utf-8'));
    if (!role) {
      throw new Error('❌ ROLE env variable is required (e.g. ROLE=admin)');
    }
    
    // Basic validation of config file structure
    if (!config.apiURL || !config.frontendURL || !config.users) {
      throw new Error("Config file missing required fields: apiURL, frontendURL, or loginEmail");
    }

    if (!config.apiURL[environment]) {
      throw new Error(` Environment "${environment}" not found in apiURL config`);
    }

    const user = config.users[role];

    if (!user) {
      throw new Error(` Role "${role}" not found in config`);
    }
    
    return {
      apiURL: config.apiURL[environment],
      frontendURL: config.frontendURL[environment],
      email: user.email,
      env: environment
    };
  } catch (err) {
    console.error("Error reading config file:", err.message);
    throw err;
  }
}
