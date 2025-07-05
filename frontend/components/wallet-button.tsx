"use client";

import { useWallet, useWalletList } from "@meshsdk/react";
import { Button } from "./ui/button";

export default function ConnectWalletButton() {
  const { connected, connect, disconnect } = useWallet();
  const wallets = useWalletList();

  return (
    <div>
      {connected ? (
        <Button variant={"destructive"} onClick={disconnect}>
          Disconnect Wallet
        </Button>
      ) : (
        wallets.map((w) => (
          <Button
            key={w.name}
            onClick={() => connect(w.name)}
          >
            Connect {w.name}
          </Button>
        ))
      )}
    </div>
  );
}
