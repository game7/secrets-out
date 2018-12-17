const crypto    = require('../lib/crypto');
const fs        = require('fs');
const settings  = require('../lib/settings');

const password  = settings.key;

function read(filename) {
    const input = filename
    const encrypted = fs.readFileSync(input, 'utf8');
    const decrypted = crypto.decrypt(encrypted, password);
    return decrypted
}

module.exports = {
    read
}