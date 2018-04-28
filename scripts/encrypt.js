const cipher = require('node-cipher');
const glob   = require('glob');
const fs     = require('fs');

function encryptFile(name) {
    const input = name;
    const output = name + '.enc';
    if(!fs.existsSync(output)) {
        // if first time encrypting a particular file let's add to .gitignore
        console.log('Adding to .gitignore')
        fs.appendFileSync('.gitignore', input + '\n')
    }
    cipher.encrypt({
        input,
        output,
        password: 'passw0rd'
    }, function (err, opts) {
        if (err) throw err;
        console.log(`Encrypted ${input} to ${output}`);
    });
}

const patterns = ['**/*.config'];

patterns.forEach(pattern => {
    glob(pattern, (err, matches) => {
        matches.forEach(encryptFile)
    })
})



