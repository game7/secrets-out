#!/usr/bin/env node

const shell     = require('../lib/shell');
const gitignore = require('../lib/gitignore');
const crypto    = require('../lib/crypto');
const glob      = require('glob');
const fs        = require('fs');

shell(function() {

    const settings  = require('../lib/settings');

    const password  = settings.key;

    function encryptFile(name) {
        const input     = name;
        const output    = name + '.enc';

        const unencrypted = fs.readFileSync(input, 'utf8');
        const encrypted = crypto.encrypt(unencrypted, password);
        fs.writeFileSync(output, encrypted, 'utf8');

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


    console.log(`Encrypting with key: ${password}`)
    patterns.forEach(pattern => {
        glob.sync(pattern).forEach(encryptFile)
    })

});
