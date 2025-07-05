import { Blockfrost, Lucid, WalletApi } from "lucid-cardano";

export async function getLucid(walletName: string = "lace"): Promise<Lucid> {
  if (typeof window === "undefined") {
    throw new Error("Lucid can only be used in the browser environment.");
  }

  const cardano = window.cardano;

  if (!cardano?.[walletName]) {
    throw new Error(
      `Wallet '${walletName}' not found. Please ensure it's installed and connected.`
    );
  }

  const api = await cardano[walletName].enable();

  const lucid = await Lucid.new(
    new Blockfrost(
      "https://cardano-preview.blockfrost.io/api/v0",
      process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY!
    ),
    "Preview"
  );

  lucid.selectWallet(api as unknown as WalletApi);
  return lucid;
}
