import server from "./server";
import * as secp256k1 from "ethereum-cryptography/secp256k1";
import {toHex} from "ethereum-cryptography/utils";
import {keccak256} from "ethereum-cryptography/keccak";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const input = evt.target.value;
    setPrivateKey(input);

    const publicKey = secp256k1.getPublicKey(input)
    const ethAddress = `0x`+toHex(keccak256(publicKey.slice(1)).slice(-20))
    setAddress(ethAddress)
    console.log(`input: `, input)
    console.log(`privateKey: `, privateKey)
    console.log(`ethAddress: `, ethAddress)
    console.log(`address: `, address)
    console.log(`balance: `, balance)
    

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${ethAddress}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type a privatekey" value={privateKey} onChange={onChange}></input>
      </label>
      <div>
        Address: {address}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
