const fs        = require('fs');
const filename  = './.gitignore';

function contains(str) {
    const gitignore = fs.existsSync(filename) ? fs.readFileSync(filename, 'utf8') : '';    
    return gitignore.indexOf(str) >= 0
}

function append(str) {
    fs.appendFileSync(filename, '\n' + str);
}

module.exports = {
    contains,
    append
}