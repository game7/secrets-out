#!/usr/bin/env node

const shell     = require('../lib/shell');
const fs        = require('fs');
const crypto    = require('crypto');
const cwd       = process.cwd();
const filename  = 'secrets.key';
const path      = cwd + '/' + filename;

console.log('bomom!!!')

shell(function() {
    const key = crypto.randomBytes(32).toString('hex');    
    fs.writeFileSync(path, key);
    console.log(`Generated new key ${key} and saved to '${filename}'`);
})


