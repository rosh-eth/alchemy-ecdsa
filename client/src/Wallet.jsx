import server from "./server";
import * as secp256k1 from "ethereum-cryptography/secp256k1";
import {toHex} from "ethereum-cryptography/utils";
import {keccak256} from "ethereum-cryptography/keccak";

// privateKey: 025ffc936cd03d7b18031c8ca603d9ba3e3b3b05077a77279e95337ba7ba9d3b
// publicKey: 047cad6e42046949a4110cc3b32316adb011440dbe35228ece0e4059848fe3162165608393eeb10d8569287e5a0c1944de13fca142979c7f10ec0a3ff51821d837
// address:  0x39a6b315be92df5c22654c727bb145efd5c84028

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const publicKey = secp256k1.getPublicKey(privateKey)    
    const ethAddress = `0x`+toHex(keccak256(publicKey.slice(1)).slice(-20))
    setAddress(ethAddress)

    if (ethAddress) {
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
