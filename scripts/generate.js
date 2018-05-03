#!/usr/bin/env node

const shell     = require('../lib/shell');
const crypto    = require('../lib/crypto');
const fs        = require('fs');

const cwd       = process.cwd();
const filename  = 'secrets.key';
const path      = cwd + '/' + filename;

console.log('bomom!!!')

shell(function() {
    const key = crypto.generate();    
    fs.writeFileSync(path, key);
    console.log(`Generated new key ${key} and saved to '${filename}'`);
})


