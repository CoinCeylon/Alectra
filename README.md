# VoteGrants: NFT-Based Governance on Cardano

> **VoteGrants is designed for student research fund treasury management and governance.**
> It empowers student communities to propose, vote, and manage research funding in a transparent, democratic, and rapid manner using Cardano blockchain technology.

VoteGrants is a fast, democratic, NFT-based governance system built on Cardano, featuring:

- **Ultra-low quorum** (2 votes to finalize)
- **Minute-based voting** (rapid decisions)
- **NFT = 1 vote** (democratic equality)
- **Secure Aiken smart contracts**
- **Modern Next.js frontend**

## 🏗️ Project Structure

```
VoteGrants/
├── contract/   # Aiken smart contracts, deployment scripts, NFT logic
└── frontend/   # Next.js web frontend for governance UI
```

## ✨ Features

- **NFT-Based Voting**: Each governance NFT = 1 vote
- **Ultra-Low Quorum**: Only 2 votes needed to finalize proposals
- **Minute-Based Voting**: Fast, efficient decision-making
- **Secure Treasury**: On-chain fund management
- **Modern UI**: React/Next.js frontend for easy participation

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Aiken](https://aiken-lang.org/) (latest)
- [Blockfrost API Key](https://blockfrost.io/) (Cardano Preview Testnet)

---

## 1️⃣ Contract: Smart Contracts & NFT Governance

**Location:** `contract/`

### Setup & Install

```bash
cd contract
npm install
```

### Environment

Create a `.env` file with your Blockfrost key:

```bash
echo "BLOCKFROST_API_KEY=your_preview_api_key_here" > .env
```

### Build, Test, Deploy

```bash
# Compile contracts
npm run build

# Run tests
npm run test

# Deploy governance system (NFT minting, contract setup)
npm run deploy
```

- **Scripts:** See `package.json` for all available commands.
- **NFTs:** 5 unique governance NFTs (CIP-25 metadata, 1 vote each)
- **Network:** Cardano Preview Testnet

---

## 2️⃣ Frontend: Web Governance UI

**Location:** `frontend/`

### Setup & Install

```bash
cd frontend
npm install
```

### Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

- **Tech:** Next.js, React, TailwindCSS, Lucid, Mesh SDK
- **Wallet:** Connect Cardano wallet, interact with proposals, vote

---

## 🗳️ How It Works

- **Create Proposal:** Anyone can propose (minute-based voting period)
- **Vote:** Hold a governance NFT to vote (1 NFT = 1 vote)
- **Quorum:** 2 votes required to finalize
- **Majority:** 51% approval needed
- **Fast:** Proposals finalize in minutes, not days


---

## 📄 License

This project is licensed under the [Apache 2.0 License](LICENSE).

---

**Built with ❤️ for the CoinCeylon Hackathon**
