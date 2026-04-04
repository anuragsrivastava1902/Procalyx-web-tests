import { loginAndSaveState } from '../utils/auth/login-service.js';

const role = process.argv[2];
const environment = process.argv[3] || 'qa';

if (!role) {
    console.error('Please provide role: node scripts/login.js <role> [env]');
    process.exit(1);
}

(async () => {
    await loginAndSaveState(role, environment);
})();