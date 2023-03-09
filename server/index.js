const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

const balances = {
  "0x1": 100,
  "0x2": 50,
  "0x3": 75,
  "0xf73e678189af8dd53d03b1021a8b89c6c70d98dd": 10,
  "0x39a6b315be92df5c22654c727bb145efd5c84028": 120,
  "0x7dd9113770852f83ec75575ab262d3297caff9eb": 30,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, stringSignature, message, recoveryBit } =
    req.body;

  console.log(req.body);

  const JsonToArray = function (json) {
    let str = json.split(",");

    return str;
  };

  const newSignature = JsonToArray(stringSignature);

  const arrayToUint8 = function (arr) {
    let ret = new Uint8Array(arr.length);
    for (var i = 0; i < arr.length; i++) {
      ret[i] = arr[i];
    }
    return ret;
  };

  const y = arrayToUint8(newSignature);

  console.log(newSignature);
  console.log(y);

  // const recoveredKey = recoverKey(message, signature, recoveryBit);
  // const recoveredAddress = getEthAddress(recoveredKey);
  // console.log(recoveredAddress);

  // console.log(recoveredKey);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function hashMsg(msg) {
  return keccak256(utf8ToBytes(msg));
}

async function recoverKey(msg, signature, recoveryBit) {
  const msgHash = hashMsg(msg);
  const publicKey = secp.recoverPublicKey(msgHash, signature, recoveryBit);
  return publicKey;
}

function getEthAddress(publicKey) {
  return `0x` + toHex(keccak256(publicKey.slice(1)).slice(-20));
}
