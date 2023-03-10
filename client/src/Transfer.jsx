import { keccak256 } from "ethereum-cryptography/keccak";
import * as secp from "ethereum-cryptography/secp256k1";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { useState } from "react";
import server from "./server";

const message = "please send me some money";

function hashMsg(msg) {
  return keccak256(utf8ToBytes(msg));
}

async function signMsg(msg, privateKey) {
  const msgHash = hashMsg(msg);
  return await secp.sign(msgHash, privateKey, { recovered: true });
}

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState(1);
  const [recipient, setRecipient] = useState("0x2");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const [signature, recoveryBit] = await signMsg(message, privateKey);
    const stringSignature = signature.toString();

    // const publicKey = secp.getPublicKey(privateKey);
    // console.log("publicKey", publicKey);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        stringSignature,
        message,
        recoveryBit: parseInt(recoveryBit),
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
