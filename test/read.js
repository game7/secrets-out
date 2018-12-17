const file = require('../lib/file');

const decrypt = function(filename) {

    const line = function() { console.log('--------------------------------------') }
    const space = function() { console.log('') }

    space();
    line();
    console.log(filename);
    line()
    console.log(file.read(filename));
    line()    
    space()

}

decrypt('./config/application.secrets.json.enc');

decrypt('./config/secrets.yml.enc');