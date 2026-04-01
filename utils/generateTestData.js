/**
 * Generates a random 10-digit mobile number starting with 7, 8, or 9.
 * @returns {string}
 */
export function generateMobileNumber() {
    const firstDigit = ['7', '8', '9'][Math.floor(Math.random() * 3)];
    // Generate 9 random digits
    let remaining = '';
    for (let i = 0; i < 9; i++) {
        remaining += Math.floor(Math.random() * 10).toString();
    }
    return firstDigit + remaining;
}

/**
 * Generates a sample email using the name and first five letters of the hospital name.
 * Format: name.hospit@yopmail.com
 * @param {string} name - The person's name or SPOC name.
 * @param {string} hospitalName - The hospital's name.
 * @returns {string}
 */
export function generateEmail(name, hospitalName) {
    const cleanName = name.toLowerCase().trim().replace(/\s+/g, '.');
    const cleanHospital = hospitalName.toLowerCase().trim().replace(/\s+/g, '').substring(0, 5);
    // Adding a short unique suffix to avoid collisions in parallel runs
    const uniqueSuffix = Math.floor(Math.random() * 100);
    return `${cleanName}${uniqueSuffix}.${cleanHospital}@yopmail.com`;
}
