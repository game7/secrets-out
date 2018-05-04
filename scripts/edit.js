#!/usr/bin/env node

const shell     = require('../lib/shell');
const crypto    = require('../lib/crypto');
const glob      = require('glob');
const fs        = require('fs');
const readline  = require('readline');

shell(function() {

    const settings  = require('../lib/settings');
    const password  = settings.key;
    const patterns = settings.files;

    const files = glob.sync('**/*.enc', { ignore: ['node_modules/**/*'] })

    files.forEach((file, index) => console.log(`${index+1}) ${file}`));
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // load and decrypt secrets file
    function load(filename) {
        const encrypted = fs.readFileSync(filename, 'utf8');
        const decrypted = crypto.decrypt(encrypted, password);
        return decrypted;
    }

    // save and encrypt secrets file
    function save(filename, content) {
        const encrypted = crypto.encrypt(content, password);
        fs.writeFileSync(filename, encrypted, 'utf8');
    }    

    // load, edit and save file
    function edit(filename) {
        if(!filename) return;
        console.log(`Opening '${filename}' in default text editor`);
        const decrypted = load(filename);
        const ExternalEditor = require('external-editor')
        const updated = ExternalEditor.edit(decrypted);
        save(filename, updated);
        console.log(`Encrypted and Saved '${filename}'`);
    }

    // select a file to edit
    function select(callback) {
        rl.question('Which file would you like to edit?', (answer) => {
            const index = parseInt(answer) - 1;
            const filename = files[index]
            if(filename) {
                callback(filename);
            } else {
                console.log(`"${answer}" is not a valid choice!  Please enter a file number`);
            }
            rl.close();
        })
    }

    switch(files.length) {
        case 0:
            console.log('secrets-out could not locate any encrypted files with extension .enc');
            break;
        case 1: 
            edit(files[0]);
            break;
        default:
            select(edit);
            break;
    }

});
