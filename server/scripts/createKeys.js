const secp = require("ethereum-cryptography/secp256k1"); // bring in the secp256k1 library
const { toHex } = require("ethereum-cryptography/utils"); // bring in the toHex utility function, which is an alias for bytesToHex
const { keccak256 } = require("ethereum-cryptography/keccak"); // bring in the keccak256 utility function

/*
    Create a new private key
    - utility function generates a byte array of 32 random bytes
    - convert to hex
    - convert to string
*/

const privateKey = secp.utils.randomPrivateKey();
const privateKeyHex = toHex(privateKey);
console.log("privateKeyHex: ", privateKeyHex);

/*
    Get the public key from the private key
    - utility function converts the private key to a byte array
    - utility function converts the public key to a hex string
*/

const publicKey = secp.getPublicKey(privateKey);
const publicKeyHex = toHex(publicKey);
console.log("publicKey: ", publicKeyHex);

/*
    Get the address from the public key
    - utility function converts the public key to a byte array
    - utility function hashes the public key using keccak256 after removing the first byte
    - utility function slices the last 20 bytes of the hash
    - utility function converts the 20 byte slice to a hex string and prepends 0x
*/

function getAddress(publicKey) {
  return `0x` + toHex(keccak256(publicKey.slice(1)).slice(-20));
}

console.log(`address: `, getAddress(publicKey));

// privateKey: 025ffc936cd03d7b18031c8ca603d9ba3e3b3b05077a77279e95337ba7ba9d3b
// publicKey: 047cad6e42046949a4110cc3b32316adb011440dbe35228ece0e4059848fe3162165608393eeb10d8569287e5a0c1944de13fca142979c7f10ec0a3ff51821d837
// address:  0x39a6b315be92df5c22654c727bb145efd5c84028

// privateKey: 546ef4d056bb53ca767e2c88d86fdd11521e531540ec76c1dac48b0d0b4c60cb
// publicKey: 04a2d1a687b3302ddd31686bf5be27d99da1a6999a76315c316f523603f310d8ec65d450d8e25cd81bda04a63194fb988bfae37244a0792df5a60cfec2a5489752
// address:  0xbe9d7fb836ed9f10dac0d2efb023cae9c25d6d86

// privateKey: 40e18eff2a5beff58dcf99946437a02f849952542a5786d4a6e487f29e6c4b9c
// publicKey: 0461c58b2e26d6a32f53207d9cf5850ed76fc5ba54f34173d1849debfa46a18ccd815f3d7aa790ffed8dd7f135af70cf90128f02d95b8992c7d871392ce0c9f0b1
// address:  0x4325715238f5dfe7f2d018ff2cf2615ac17fbb78
