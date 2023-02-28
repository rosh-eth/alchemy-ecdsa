const secp = require('ethereum-cryptography/secp256k1')
const {toHex} = require('ethereum-cryptography/utils')

const privateKey = secp.utils.randomPrivateKey()
console.log('privateKey', privateKey)
// console.log('publicKey', publicKey)
const privateKeyHex = toHex(privateKey)
console.log('privateKeyHex', privateKeyHex)

const publicKey = secp.utils.bytesToHex(secp.getPublicKey(privateKey))
console.log('publicKey', publicKey)

// privateKey: c9fdb50258db7d9fae061c6688e86a28cc582f62c298969018bdf1a5c91d10b9
// publicKey: 046567369d2d8c2a16c59995cd336999e2eae4353d01d82dbb4044dd7a3a25c34e0aa3018435c4dc9a6e95b17183896ab9f45787bb7c1cfe6eaa455a1f6573569f
