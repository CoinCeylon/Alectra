"use client";

import { useEffect, useState } from "react";
import { useWallet, useWalletList } from "@meshsdk/react";
import { Button } from "./ui/button";

export default function ConnectWalletButton() {
  const { connected, connect, disconnect, wallet } = useWallet();
  const wallets = useWalletList();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Auto-connect to first wallet
  useEffect(() => {
    if (!connected && wallets.length > 0) {
      connect(wallets[0].name);
    }
  }, [wallets, connected, connect]);

  // Get wallet address
  useEffect(() => {
    const fetchAddress = async () => {
      if (connected) {
        const address = await wallet.getUsedAddresses();
        setWalletAddress(address[0]);
      } else {
        setWalletAddress(null);
      }
    };
    fetchAddress();
  }, [connected, wallet]);

  const truncateAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
  };

  return (
    <div className="flex items-center gap-4">
      {connected && walletAddress ? (
        <>
          <div className="flex items-center gap-2 text-sm px-4 py-2 border rounded-lg bg-muted">
            <span className="text-muted-foreground">
              {truncateAddress(walletAddress)}
            </span>
          </div>
          <Button variant="destructive" onClick={disconnect}>
            Disconnect
          </Button>
        </>
      ) : (
        wallets.map((w) => (
          <Button key={w.name} onClick={() => connect(w.name)}>
            Connect {w.name}
          </Button>
        ))
      )}
    </div>
  );
}
