#!/usr/bin/env node

const shell     = require('../lib/shell');
const fs        = require('fs');
const cwd       = process.cwd();

function addSettingsToManifest() {
    const package   = require('../lib/package');    

    if(package['secrets-out']) {
        console.log('"secrets-out" already exists in package.json')
    } else {
        package['secrets-out'] = {
            "files": []
        };
        fs.writeFileSync(cwd + '/package.json', JSON.stringify(package, null, 2));
        console.log('"secrets-out" added to package.json');
    }
}

function createSecretsFile() {
    const filename  = 'secrets.key';
    const path      = cwd + '/' + filename;
    const dummyKey  = 'place-your-secret-key-here';
    const gitignore = require('../lib/gitignore');

    if(fs.existsSync(path)) {
        console.log("secrets.key file already exits")
    } else {
        fs.appendFileSync(path, dummyKey);
        console.log(`Created '${filename}'`);
    }

    if(gitignore.contains(filename)) {
        console.log("secrets.key already present in .gitignore");
    } else {
        gitignore.append(filename);
        console.log("secrets.key added to .gitignore");
    }
}

shell(function() {
    addSettingsToManifest();
    createSecretsFile();
})


