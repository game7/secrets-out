#!/usr/bin/env node

const shell     = require('../lib/shell');
const gitignore = require('../lib/gitignore');
const cipher    = require('node-cipher');
const glob      = require('glob');
const fs        = require('fs');
const settings  = require('../lib/settings');

const password  = settings.key;

function encryptFile(name) {
    const input     = name;
    const output    = name + '.enc';

    cipher.encryptSync({
        input,
        output,
        password
    });

    console.log(`Encrypted '${input}' to '${output}'`);

    // add files to .gitignore if not already there
    if(gitignore.contains(input)) {       
        console.log(`'${input}' present in .gitignore`);
    } else {
        gitignore.append(input);
        console.log(`Added '${input}' to .gitignore`);        
    }      

}

const patterns = settings.files;

shell(function() {
    console.log(`Encrypting with key: ${password}`)
    patterns.forEach(pattern => {
        glob.sync(pattern).forEach(encryptFile)
    })
});
