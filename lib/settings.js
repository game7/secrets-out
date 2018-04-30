const package   = require('./package');
const fs        = require('fs');
const settings  = package['secrets-out'];

let key = null;

const missingEnvironmentVariableMessage = `
secrets-out has attempted to use the 'key' attribute
specified 'package.json' however there is no
corresponding environment variable present.  

In order to encrypt/decrypt an encryption key must be provided
via command-line argument, 'secrets.key' file or 
environment variable
`

const keyRequiredMessage = `
secrets-out requires an encryption key to be provided 
via command-line argument, 'secrets.key' file or 
environment variable
`

const noSettingsMessage = `
secrets-out requires settings to be specified
in package.json.  For example:

  "secrets-out": {
    "files": [
      "**/secrets.yml",
      "web.config"
    ]
  }
  
`
const defaultKeyMessage = `
You are attempting to encrypt using the
secrets-out default key.  Please add you application's
key to secrets.yml or run secrets-generate to have a 
new encryption key created for you
`

const noFilesAttributeMessage = `
secrets-out requires a 'files' array to be specified
in package.json. For example:

  "secrets-out": {
    "files": [
      "**/secrets.yml",
      "web.config"
    ]
  }

`

if(!settings) throw(noSettingsMessage);

if (process.argv[2]) {
    // use key from command-line args
    console.log('Using secret key from command line argument')
    settings['key'] = process.argv[2];
} else if (fs.existsSync('secrets.key')) {
  const key = fs.readFileSync('secrets.key', 'utf8');
  if(key == 'place-your-secret-key-here') throw(defaultKeyMessage);
  settings['key'] = key;
} else if (settings['key']) {
    // use key from settings to fetch corresponding
    // environment variable
    if(process.env[settings['key']]) {
        settings['key'] = process.env[settings['key']];
    } else {
        throw(missingEnvironmentVariableMessage)
    }
} else {
    throw(keyRequiredMessage);
}

if(!settings.files) throw(noFilesAttributeMessage);
if(settings.files.length == 0) console.log(noFilesAttributeMessage);

module.exports = settings;