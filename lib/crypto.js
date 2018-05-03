const fs        = require('fs');
const crypto    = require('crypto');

const algorithm = 'aes-256-ctr';

function encrypt(text, key) {
    const cipher = crypto.createCipher(algorithm, key);
    const crypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    return crypted;
}

function decrypt(text, key) {
    const decipher = crypto.createDecipher(algorithm, key);
    const decrypted = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
    return decrypted;
}

function generate() {
  return crypto.randomBytes(32).toString('hex');
}

module.exports = {
    generate,
    encrypt,
    decrypt
}