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
    console.log("📋 Policy ID:", policyId);

    // NFT Metadata
    const metadata: any = {
      721: {
        [policyId]: {},
      },
    };

    // Mint multiple unique NFTs for governance voting with metadata
    const nftAssets: { [key: string]: bigint } = {};
    const numNFTs = 5; // Create 5 unique governance NFTs

    for (let i = 1; i <= numNFTs; i++) {
      const assetName = fromText(`GOV_NFT_${i}`);
      const unit = policyId + assetName;
      nftAssets[unit] = 1n; // Each NFT has quantity 1

      // Add metadata for each NFT
      metadata[721][policyId][`GOV_NFT_${i}`] = {
        name: `Governance NFT #${i}`,
        description:
          "Governance voting power NFT for VoteGrants DAO.",
        image:
          "ipfs://bafkreien4g4jei6lo63o53xvfvod5yw4lsfon57f2lpfdtqeczsar3at",
        mediaType: "image/png",
        attributes: [
          {
            trait_type: "Voting Power",
            value: "1",
          },
          {
            trait_type: "NFT Number",
            value: i.toString(),
          },
          {
            trait_type: "Type",
            value: "Governance",
          },
        ],
      };
    }

    console.log("🎫 Minting", numNFTs, "governance NFTs with metadata...");

    const tx = await lucid
      .newTx()
      .mintAssets(nftAssets) // mint unique NFTs
      .attachMintingPolicy(policy)
      .attachMetadata(721, metadata[721]) // Add CIP-25 metadata
      .validTo(Date.now() + 100000)
      .complete();

    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();

    console.log("✅ Minted", numNFTs, "governance NFTs:");
    Object.keys(nftAssets).forEach((unit, index) => {
      console.log(`   NFT ${index + 1}: ${unit}`);
    });
    console.log("📦 TX Hash:", txHash);

    // Wait for confirmation and verify deployment
    console.log("⏳ Waiting for transaction confirmation...");
    await lucid.awaitTx(txHash);
    console.log("✅ Transaction confirmed!");

    // Check final governance setup
    console.log("\n🏛️ Governance System Status:");
    console.log("========================================");
    console.log("✅ NFT-based governance system deployed");
    console.log(`📋 Policy ID: ${policyId}`);
    console.log("⚙️  Configuration:");
    console.log("   • Voting Power: 1 vote per NFT");
    console.log("   • Minimum Votes: 2 (hardcoded in contracts)");
    console.log("   • Time Unit: Minutes");
    console.log("   • Approval Threshold: 51%");
    console.log(`   • Total NFTs: ${numNFTs}`);
    console.log("");
    console.log("🚀 System Ready for Governance!");
    console.log("   • Each NFT represents 1 vote");
    console.log("   • Proposals can be finalized with just 2 votes");
    console.log("   • Voting periods are in minutes for fast decisions");
    console.log("   • Democratic: Equal voting power for all participants");
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
};

main().catch(console.error);
