const cwd = process.cwd();
const package = require(cwd + '/package.json')
const settings = package['secrets-out']

module.exports = settings;