const fs        = require('fs');

const cwd       = process.cwd();
const filename  = cwd + '/package.json';

const manifestNotFoundMessage = `
    secrets-out could not locate your package.json file.
    please ensure that secrets-out command are run from
    your project's root directory and that a valid
    package.json located there
`

if(!fs.existsSync(filename)) {
    throw (manifestNotFoundMessage);
}

module.exports = require(cwd + '/package.json');