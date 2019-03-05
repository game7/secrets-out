const chalk  = require('chalk');
const figlet = require('figlet');

const line = '-----------------------------------------------------------------------------';

function shell(cb) {
  console.log();
  console.log(line);
  console.log(
    chalk.yellow(
      figlet.textSync('secrets-out', { horizontalLayout: 'full', font: 'Slant' })
    )
  );
  console.log(line);
  cb();
  console.log(line);
  console.log();
}

module.exports = shell;
