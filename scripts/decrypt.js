#!/usr/bin/env node

const shell     = require('../lib/shell');
const glob      = require('glob');
const cipher    = require('node-cipher');
const settings  = require('../lib/settings');
const password  = settings.key;

function decryptFile(filename) {
    const input = filename
    const output = filename.slice(0, -1 * '.enc'.length)
    cipher.decryptSync({
        input,
        output,
        password
    });
    console.log(`Decrypted ${input} to ${output}`);
}

shell(function() {
    console.log(`Decrypting with key: ${password}`)   
    settings.files.forEach(pattern => {
        glob.sync(pattern + '.enc').forEach(decryptFile)
    })
})

