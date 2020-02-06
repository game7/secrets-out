# Change Log

## 1.0.0

### Breaking Changes

* Switch from Node's deprecated `createCipher` and `createDecipher` to the newer `createCipheriv` and `createDecipheriv` function which no itilize and *initialization vector* as part of the encryption process.  The initialization vector is appended to the encrypted secrets file after encryption and consumed during decryption, therefore all secrets files must be re-encrypted when upgrading to version 1.x