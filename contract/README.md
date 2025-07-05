# Alectra Governance Contract 🏛️

A **NFT-based governance system** built on Cardano using Aiken smart contracts. This system enables democratic decision-making with ultra-low quorum requirements and minute-based voting periods for fast, efficient governance.

## 🎯 Key Features

- **🎫 NFT-Based Voting**: Each NFT represents 1 vote (democratic equality)
- **⚡ Ultra-Low Quorum**: Only 2 votes required to finalize proposals
- **⏱️ Minute-Based Voting**: Fast decision-making periods
- **🔒 Secure Smart Contracts**: Built with Aiken on Cardano
- **📋 Policy ID Tracking**: Comprehensive logging for integration
- **🎨 Rich NFT Metadata**: CIP-25 compliant with IPFS images

## 📊 System Specifications

| Feature                | Value                   |
| ---------------------- | ----------------------- |
| **Voting Power**       | 1 vote per NFT          |
| **Minimum Quorum**     | 2 votes                 |
| **Approval Threshold** | 51% majority            |
| **Voting Period Unit** | Minutes                 |
| **Total NFTs**         | 5 governance tokens     |
| **Network**            | Cardano Preview Testnet |

## 🏗️ Architecture

### Smart Contracts

1. **`proposal_validator.ak`** - Core voting logic with NFT-based power calculation
2. **`governance_core.ak`** - Minute-based time management and admin controls
3. **`treasury_validator.ak`** - Secure fund management and release mechanisms

### NFT Governance Tokens

- **Asset Names**: `GOV_NFT_1` through `GOV_NFT_5`
- **Voting Power**: 1 vote each (binary voting power)
- **Metadata**: CIP-25 compliant with IPFS images and attributes

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v18+)
2. **Aiken** (latest version)
3. **Blockfrost API Key** (Preview testnet)

### Setup

1. **Clone and Install**

   ```bash
   cd contract
   npm install
   ```

2. **Environment Configuration**

   ```bash
   # Create .env file
   echo "BLOCKFROST_API_KEY=your_preview_api_key_here" > .env
   ```

3. **Deploy Governance System**
   ```bash
   npm run deploy
   ```

### What Happens During Deployment

1. **Wallet Setup**: Generates or loads admin private key
2. **NFT Minting**: Creates 5 unique governance NFTs with metadata
3. **Policy ID Logging**: Displays policy ID for contract integration
4. **Transaction Confirmation**: Waits for blockchain confirmation
5. **System Status**: Shows final governance configuration

## 📋 NFT Metadata Structure

Each governance NFT includes rich CIP-25 metadata:

```json
{
  "name": "Governance NFT #1",
  "description": "Governance voting power NFT for Alectra DAO",
  "image": "ipfs://bafkreien4g4jei6lo63o53xvfvod5yw4lsfon57f2lpfdtqeczsar3at",
  "mediaType": "image/png",
  "attributes": [
    {
      "trait_type": "Voting Power",
      "value": "1"
    },
    {
      "trait_type": "NFT Number",
      "value": "1"
    },
    {
      "trait_type": "Type",
      "value": "Governance"
    }
  ]
}
```

## 🧪 Testing

Run the comprehensive test suite:

```bash
npm run test
```

**Test Coverage**:

- ✅ NFT counting validation
- ✅ Voting logic verification
- ✅ Time conversion testing
- ✅ Approval calculations
- ✅ Edge case handling (13 tests total)

## 📖 Usage Examples

### Creating a Proposal

```typescript
// Proposal creation with minute-based voting period
const proposal = {
  description: "Increase treasury allocation",
  votingPeriod: 60, // 60 minutes
  requiredVotes: 2, // Ultra-low quorum
};
```

### Voting Process

1. **Hold NFT**: Own a governance NFT (`GOV_NFT_*`)
2. **Cast Vote**: Each NFT = 1 vote (For/Against)
3. **Automatic Finalization**: Proposal auto-finalizes when 2+ votes cast
4. **51% Approval**: Majority of participating votes needed

### Fast Decision Making

- **Traditional DAO**: 7-day voting, 10% quorum
- **Alectra Governance**: 60-minute voting, 2-vote minimum
- **Result**: 10,080x faster decision-making!

## 🔧 Configuration

### Contract Parameters

```aiken
// Ultra-low quorum requirement
let minimum_votes = 2

// NFT-based voting power
fn gov_amount(val: Value) -> Int {
  if assets.quantity_of(val, gov_policy, gov_token) > 0 {
    1  // Each NFT = 1 vote
  } else {
    0
  }
}

// Minute-based time conversion
fn now(ctx: ScriptContext) -> Int {
  // Convert milliseconds to minutes
  ctx.transaction.validity_range.lower_bound / 60000
}
```

### Available Scripts

| Command          | Description              |
| ---------------- | ------------------------ |
| `npm run build`  | Compile Aiken contracts  |
| `npm run test`   | Run test suite           |
| `npm run deploy` | Deploy governance system |
| `npm run check`  | Validate contracts       |

## 📁 Project Structure

```
contract/
├── validators/           # Aiken smart contracts
│   ├── proposal_validator.ak    # Voting logic
│   ├── governance_core.ak       # Time & admin
│   ├── treasury_validator.ak    # Fund management
│   └── governance_tests.ak      # Test suite
├── script/
│   └── token.ts         # NFT deployment script
├── build/               # Compiled contracts
├── .env                 # Environment variables
└── README.md           # This file
```

## 🔐 Security Features

- **Admin Controls**: Secure treasury management
- **Time Validation**: Prevents voting period manipulation
- **NFT Verification**: Ensures only valid governance tokens count
- **Majority Rule**: 51% approval threshold prevents minority control

## 🌐 Network Information

- **Network**: Cardano Preview Testnet
- **API Provider**: Blockfrost
- **Wallet**: Admin-controlled governance
- **Asset Standard**: CIP-25 (NFT Metadata)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Run tests (`npm run test`)
4. Commit changes (`git commit -m 'Add new feature'`)
5. Push to branch (`git push origin feature/new-feature`)
6. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Benefits

### For DAOs

- **Faster Decisions**: Minutes instead of days
- **Lower Barriers**: Only 2 votes needed
- **Democratic**: Equal voting power for all

### For Developers

- **Modern Stack**: Aiken + TypeScript + Lucid
- **Well-Tested**: 13 comprehensive tests
- **Easy Deploy**: Single command deployment

### For Users

- **Simple Voting**: 1 NFT = 1 vote
- **Quick Results**: See outcomes in minutes
- **Transparent**: All logic on-chain

---

**Built with ❤️ for the Cardano ecosystem**
