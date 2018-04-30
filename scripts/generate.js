#!/usr/bin/env node

const fs        = require('fs');
const cwd       = process.cwd();
const filename  = 'secrets.key';
const path      = cwd + '/' + filename;
const dummyKey  = 'place-your-secret-key-here'

if(!fs.existsSync(cwd + '/package.json')) {
    console.log('package.json not found:  secrets-out commands should be run from your application\'s root directory')
    return
}

if(fs.existsSync(path)) {
    console.log("Oops! secrets.key file alreay exits")
} else {
    fs.appendFileSync(path, dummyKey);
}

