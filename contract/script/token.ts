import { Lucid, Blockfrost, generatePrivateKey, fromText } from "lucid-cardano";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const BLOCKFROST_API_KEY = process.env.BLOCKFROST_API_KEY!;

const main = async () => {
  try {
    console.log(
      "🔑 Using Blockfrost API Key:",
      BLOCKFROST_API_KEY.substring(0, 10) + "..."
    );

    const lucid = await Lucid.new(
      new Blockfrost(
        "https://cardano-preview.blockfrost.io/api/v0",
        BLOCKFROST_API_KEY
      ),
      "Preview"
    );

    console.log("✅ Lucid initialized successfully");

    // Load or generate private key
    let privateKey;
    try {
      privateKey = fs.readFileSync("./admin.sk", "utf-8").trim();
      console.log("📁 Loaded private key from file");
    } catch (error) {
      console.log("🔐 Generating new private key...");
      privateKey = generatePrivateKey();
      fs.writeFileSync("./admin.sk", privateKey);
      console.log("💾 Saved new private key to admin.sk");
    }

    await lucid.selectWalletFromPrivateKey(privateKey);

    console.log("✅ Wallet selected successfully");

    const address = await lucid.wallet.address();
    console.log("🏠 Wallet address:", address);

    // Check wallet balance
    const utxos = await lucid.wallet.getUtxos();
    console.log("💰 Available UTXOs:", utxos.length);

    if (utxos.length === 0) {
      console.log("⚠️  Wallet has no UTXOs. Please send some ADA to:", address);
      return;
    }

    const walletAddress = await lucid.wallet.address();
    const keyHash =
      lucid.utils.getAddressDetails(walletAddress).paymentCredential?.hash;

    const policy = lucid.utils.nativeScriptFromJson({
      type: "sig",
      keyHash: keyHash,
    });

    const policyId = lucid.utils.mintingPolicyToId(policy);
    const assetName = fromText("GOV");
    const unit = policyId + assetName;

    const tx = await lucid
      .newTx()
      .mintAssets({ [unit]: 1000n }) // mint 1000 GOV tokens
      .attachMintingPolicy(policy)
      .validTo(Date.now() + 100000)
      .complete();

    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();

    console.log("✅ Minted GOV token:", unit);
    console.log("📦 TX Hash:", txHash);
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
};

main().catch(console.error);
