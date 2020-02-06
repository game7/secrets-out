const fs        = require('fs');
const crypto    = require('crypto');

const ALGORITHM = 'aes-256-ctr';
const IV_LENGTH = 16;

function getCipherKey(key) {
    return crypto.createHash('sha256').update(key).digest()
}

function encrypt(text, key) {
    const initVector = crypto.randomBytes(16).toString('hex').slice(IV_LENGTH);
    const cypherKey = getCipherKey(key);
    const cipher = crypto.createCipheriv(ALGORITHM, cypherKey, initVector);
    const crypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    return initVector + crypted;
}

function decrypt(text, key) {
    const initVector = text.slice(0, IV_LENGTH)
    const cypherKey = getCipherKey(key);    
    const content = text.slice(IV_LENGTH)
    const decipher = crypto.createDecipheriv(ALGORITHM, cypherKey, initVector);
    const decrypted = decipher.update(content, 'hex', 'utf8') + decipher.final('utf8');
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