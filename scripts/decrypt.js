const glob   = require('glob');
const cipher = require('node-cipher');

glob('**/*.enc', (err, matches) => {
    matches.forEach(match => {
        const input = match;
        const output = match.slice(0, -1 * '.sec'.length)
        cipher.decrypt({
            input,
            output,
            password: 'passw0rd'
        }, function (err, opts) {
            if (err) throw err;
            console.log(`Decrypted ${input} to ${output}`);
        });
    })
})
