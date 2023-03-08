import { useState } from "react";
import "./App.scss";
import Transfer from "./Transfer";
import Wallet from "./Wallet";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState(0);

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        address={address}
        setAddress={setAddress}
      />
      <Transfer
        setBalance={setBalance}
        address={address}
        privateKey={privateKey}
        signature={signature}
        setSignature={setSignature}
        recoveryBit={recoveryBit}
        setRecoveryBit={setRecoveryBit}
      />
    </div>
  );
}

export default App;
