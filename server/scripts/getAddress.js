const secp = require('ethereum-cryptography/secp256k1')
const { keccak256} = require('ethereum-cryptography/keccak')

function getAddress(publicKey) {
    return keccak256(publicKeyButeArray).slice(1).slice(-20)
}

const publicKey = '046567369d2d8c2a16c59995cd336999e2eae4353d01d82dbb4044dd7a3a25c34e0aa3018435c4dc9a6e95b17183896ab9f45787bb7c1cfe6eaa455a1f6573569f'
const publicKeyButeArray = secp.utils.hexToBytes(publicKey)
console.log(publicKeyButeArray)
const test = getAddress(publicKeyButeArray)
console.log(secp.utils.bytesToHex(test))


// privateKey: c9fdb50258db7d9fae061c6688e86a28cc582f62c298969018bdf1a5c91d10b9
// publicKey: 046567369d2d8c2a16c59995cd336999e2eae4353d01d82dbb4044dd7a3a25c34e0aa3018435c4dc9a6e95b17183896ab9f45787bb7c1cfe6eaa455a1f6573569f