# secrets-out

![Seacrest Out!](https://raw.githubusercontent.com/game7/secrets-out/master/ryan_seacrest_415.jpg?raw=true "Seacrest Out!")

secrets-out is a command-line utility used to securely manage encrypted files and settings in your projects.  It allows you to commit encrypted information into a repository such as git/github so that it remain alongside the project's code base while also helping to ensure that the original unencrypted information is not exposed.

Inspired by [Rails' Encrypted Secrets][1] and the [sekrets][2] gem.

[1]: https://rubyinrails.com/2018/02/24/rails-5-1-encrypted-secrets-management-feature/
[2]: https://github.com/ahoward/sekrets

## Getting Started

### Install

Requires Node.js and NPM

````
> npm install -g secrets-out
````

### Incorporating into your Project

secrets-out relies upon your project's manifest (package.json) for configuration and must be executed from the same directory as your package.json file.

To add secrets-out to an existing application simply run the command `secrets-install` and the utility will take care of the following:

1. add a 'secrets-out' configuration file to `package.json`
2. create a `secrets.key` file to store your master encryption key locally
3. add `secrets.key` to your `.gitignore` so that it is not commited to your repo (and potentially exposed)

After running `secrets-install` we must set our master key in the `secrets.key` file.  If you would like to have a strong key generated for you, just run `secrets-generate` and secrets-out will add a random 32-bit key to your key file.

Finally, we need to configure secrets-out to indentify the files that you would like to have encrypted.  This can be easily accomplished by adding a list of files (by name or GLOB) to the *files* attribute as demonstrated below

````
  "secrets-out": {
    "files": [
      "config/secrets.yml",
      "config/*secrets.config",
      "*secrets.config"
    ]
  }
````

### Encrypting Secrets

Once configured we can now encrypt our files.  By running the command `secrets-encrypt`, secrets-out will locate all files matching the configured *files* patterns and perform the following:

1. Encrypt the file using [node-cipher] using the configured master key.  Each file's encrypted counterpart shall have the same filename with a *.enc* extension added
2. Check the project's *.gitignore* file and add the unencrypted source filename if not present.  This shall ensure the source file is not committed to git/github.  (existing projects may require steps to manually remove files that were previously committed to the repo)

### Decrypting Secrets

Decrypting is just as simple.  Run the command `secrets-decrypt` and any matching files (.enc counterpart) shall be decrypted using the master key.

## Master Key

secrets-out requires a master key to encrypt and decrypt files.  This key can be provided to secrets-out using one of 3 different strategies

1. A `secrets.key` file located in the project's root folder containing only the key (no line breaks or other characters). This is recommended for local development.
2. A command-line argument using the pattern `secrets-encrypt your_master_key_here`.  This approach can be useful in transient environments such as build servers.
3. An environment variable as designated by the `key` attribute in your secrets-out configuration.  For example, if we would like to use an environment variable named `SOME_MASTER_KEY` we simply update the project's `package.json` to include the attribute `"key": "SOME_MASTER_KEY"` and secrets-out will attempt to use this value to encrypt/decrypt.
