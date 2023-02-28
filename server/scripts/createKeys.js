const secp = require('ethereum-cryptography/secp256k1') // bring in the secp256k1 library
const {toHex} = require('ethereum-cryptography/utils') // bring in the toHex utility function, which is an alias for bytesToHex
const {keccak256} = require('ethereum-cryptography/keccak') // bring in the keccak256 utility function


/*
    Create a new private key
    - utility function generates a byte array of 32 random bytes
    - convert to hex
    - convert to string
*/

const privateKey = secp.utils.randomPrivateKey()
const privateKeyHex = toHex(privateKey)
console.log('privateKeyHex: ', privateKeyHex)

/*
    Get the public key from the private key
    - utility function converts the private key to a byte array
    - utility function converts the public key to a hex string
*/

const publicKey = secp.getPublicKey(privateKey)
const publicKeyHex = toHex(publicKey)
console.log('publicKey: ', publicKeyHex)

/*
    Get the address from the public key
    - utility function converts the public key to a byte array
    - utility function hashes the public key using keccak256 after removing the first byte
    - utility function slices the last 20 bytes of the hash
    - utility function converts the 20 byte slice to a hex string and prepends 0x
*/

function getAddress(publicKey) {
    return `0x` + toHex(keccak256(publicKey.slice(1)).slice(-20))
}

console.log(`address: `, getAddress(publicKey))

// privateKey: 025ffc936cd03d7b18031c8ca603d9ba3e3b3b05077a77279e95337ba7ba9d3b
// publicKey: 047cad6e42046949a4110cc3b32316adb011440dbe35228ece0e4059848fe3162165608393eeb10d8569287e5a0c1944de13fca142979c7f10ec0a3ff51821d837
// address:  0x39a6b315be92df5c22654c727bb145efd5c84028