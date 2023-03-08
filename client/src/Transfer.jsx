import { keccak256 } from "ethereum-cryptography/keccak";
import * as secp from "ethereum-cryptography/secp256k1";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { useState } from "react";
import server from "./server";

function hashMsg(msg) {
  return keccak256(utf8ToBytes(msg));
}

function signMsg(msg, privateKey) {
  const msgHash = hashMsg(msg);
  return secp.sign(msgHash, privateKey, { recovered: true });
}

async function recoverKey(msg, signature, recoveryBit) {
  const msgHash = hashMsg(msg);
  const publicKey = secp.recover(msgHash, signature, recoveryBit);
  return secp.getPublicKey(privateKey);
}

function Transfer({
  address,
  setBalance,
  privateKey,
  signature,
  setSignature,
  recoveryBit,
  setRecoveryBit,
}) {
  const [sendAmount, setSendAmount] = useState(10);
  const [recipient, setRecipient] = useState("0x2");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
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
