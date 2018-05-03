#!/usr/bin/env node

const shell     = require('../lib/shell');
const gitignore = require('../lib/gitignore');
const crypto    = require('../lib/crypto');
const glob      = require('glob');
const fs        = require('fs');
const settings  = require('../lib/settings');

const password  = settings.key;

function decryptFile(filename) {
    const input = filename
    const output = filename.slice(0, -1 * '.enc'.length)

    const encrypted = fs.readFileSync(input, 'utf8');
    const decrypted = crypto.decrypt(encrypted, password);
    fs.writeFileSync(output, decrypted, 'utf8');

    console.log(`Decrypted ${input} to ${output}`);
}

shell(function() {
    console.log(`Decrypting with key: ${password}`)   
    settings.files.forEach(pattern => {
        glob.sync(pattern + '.enc').forEach(decryptFile)
    })
})

