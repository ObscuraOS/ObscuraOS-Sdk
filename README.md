# Obscura OS SDK

[![npm version](https://img.shields.io/npm/v/@obscura/sdk.svg)](https://www.npmjs.com/package/@obscura/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

> **Privacy-First Web3 Operating System SDK** - Build privacy-preserving applications with zero-knowledge proofs, on-chain analysis, and multi-chain support.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

Obscura OS SDK is a comprehensive toolkit for building privacy-focused Web3 applications. It provides developers with powerful APIs to integrate on-chain privacy analysis, zero-knowledge proof generation, and secure transaction handling into their decentralized applications.

### Why Obscura OS?

- **Privacy by Design**: Built from the ground up with privacy as a core principle
- **Non-Custodial**: Your keys, your control - we never have access to your private keys
- **Multi-Chain**: Support for Ethereum, Polygon, Arbitrum, Optimism, and BSC
- **Zero-Knowledge Proofs**: Generate and verify ZK proofs for private verification
- **AI-Powered Analysis**: Intelligent on-chain pattern detection and risk assessment

---

## Features

### Core Modules

| Module | Description |
|--------|-------------|
| `PrivacyScanner` | Analyze wallet addresses for privacy vulnerabilities and exposure risks |
| `ZKProofEngine` | Generate and verify zero-knowledge proofs for private transactions |
| `ChainAnalyzer` | Multi-chain transaction analysis and pattern detection |
| `WalletShield` | Real-time wallet monitoring and threat detection |
| `ObfuscationLayer` | Data masking, address scrambling, and metadata stripping |

### Supported Networks

| Network | Chain ID | Status |
|---------|----------|--------|
| Ethereum Mainnet | 1 | Live |
| Polygon | 137 | Live |
| Arbitrum One | 42161 | Live |
| Optimism | 10 | Live |
| BNB Smart Chain | 56 | Live |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        OBSCURA OS SDK                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Privacy    │  │  ZK Proof    │  │    Chain     │          │
│  │   Scanner    │  │   Engine     │  │   Analyzer   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                 │                   │
│  ┌──────┴─────────────────┴─────────────────┴───────┐          │
│  │                  CORE ENGINE                      │          │
│  │  ┌─────────────────────────────────────────────┐ │          │
│  │  │              Encryption Layer                │ │          │
│  │  │  • AES-256-GCM  • ChaCha20-Poly1305         │ │          │
│  │  │  • ECDH Key Exchange  • Ed25519 Signatures  │ │          │
│  │  └─────────────────────────────────────────────┘ │          │
│  └──────────────────────────────────────────────────┘          │
│                            │                                    │
│  ┌─────────────────────────┴─────────────────────────┐         │
│  │                 PROVIDER LAYER                     │         │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │         │
│  │  │Ethereum │ │ Polygon │ │Arbitrum │ │Optimism │  │         │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘  │         │
│  └───────────────────────────────────────────────────┘         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Component Overview

#### 1. Privacy Scanner
The Privacy Scanner module analyzes blockchain addresses to identify potential privacy vulnerabilities:

- **Exposure Detection**: Identifies linked addresses, exchange deposits, and known entity interactions
- **Risk Scoring**: Generates a privacy risk score (0-100) based on on-chain behavior
- **Recommendation Engine**: Provides actionable steps to improve privacy posture

#### 2. ZK Proof Engine
Zero-knowledge proof generation and verification system:

- **Proof Types**: Supports Groth16, PLONK, and STARK proof systems
- **Private Verification**: Prove ownership or attributes without revealing underlying data
- **Cross-Chain Proofs**: Generate proofs that can be verified across multiple networks

#### 3. Chain Analyzer
Multi-chain transaction analysis and pattern detection:

- **Transaction Graph**: Build and analyze transaction relationship graphs
- **Pattern Detection**: Identify suspicious patterns and potential threats
- **Historical Analysis**: Deep dive into address history across supported chains

#### 4. Wallet Shield
Real-time wallet protection and monitoring:

- **Threat Detection**: Identify malicious contracts and phishing attempts
- **Approval Monitoring**: Track and manage token approvals
- **Alert System**: Configurable alerts for suspicious activities

#### 5. Obfuscation Layer
Data privacy and protection utilities:

- **Address Scrambling**: Generate stealth addresses for private transactions
- **Metadata Stripping**: Remove identifying metadata from transactions
- **Trace Prevention**: Advanced techniques to break transaction linkability

---

## Installation

### npm

```bash
npm install @obscura/sdk
```

### yarn

```bash
yarn add @obscura/sdk
```

### pnpm

```bash
pnpm add @obscura/sdk
```

---

## Quick Start

### Initialize the SDK

```typescript
import { ObscuraSDK } from '@obscura/sdk';

// Initialize with your API key
const obscura = new ObscuraSDK({
  apiKey: 'your-api-key',
  network: 'ethereum', // or 'polygon', 'arbitrum', 'optimism', 'bsc'
  options: {
    enableLogging: true,
    cacheEnabled: true,
    cacheTTL: 300, // 5 minutes
  }
});
```

### Scan an Address for Privacy Risks

```typescript
import { PrivacyScanner } from '@obscura/sdk';

const scanner = new PrivacyScanner(obscura);

// Perform privacy analysis
const result = await scanner.analyze('0x742d35Cc6634C0532925a3b844Bc9e7595f1Ab23');

console.log('Privacy Score:', result.score);
console.log('Risk Level:', result.riskLevel);
console.log('Vulnerabilities:', result.vulnerabilities);
console.log('Recommendations:', result.recommendations);
```

### Generate a Zero-Knowledge Proof

```typescript
import { ZKProofEngine } from '@obscura/sdk';

const zkEngine = new ZKProofEngine(obscura);

// Generate proof of ownership without revealing the address
const proof = await zkEngine.generateProof({
  type: 'ownership',
  claim: {
    asset: 'ETH',
    minBalance: '1.0',
  },
  privateInputs: {
    address: '0x...',
    signature: '0x...',
  }
});

// Verify the proof
const isValid = await zkEngine.verifyProof(proof);
console.log('Proof valid:', isValid);
```

### Monitor Wallet in Real-Time

```typescript
import { WalletShield } from '@obscura/sdk';

const shield = new WalletShield(obscura);

// Start monitoring
shield.monitor('0x742d35Cc6634C0532925a3b844Bc9e7595f1Ab23', {
  onThreatDetected: (threat) => {
    console.log('Threat detected:', threat.type, threat.severity);
  },
  onApprovalChange: (approval) => {
    console.log('Approval changed:', approval.token, approval.spender);
  },
  onHighRiskTransaction: (tx) => {
    console.log('High risk transaction:', tx.hash);
  }
});
```

---

## API Reference

### ObscuraSDK

The main entry point for the SDK.

```typescript
interface ObscuraConfig {
  apiKey: string;
  network: 'ethereum' | 'polygon' | 'arbitrum' | 'optimism' | 'bsc';
  options?: {
    enableLogging?: boolean;
    cacheEnabled?: boolean;
    cacheTTL?: number;
    rpcUrl?: string;
  };
}

class ObscuraSDK {
  constructor(config: ObscuraConfig);
  
  // Module accessors
  get privacyScanner(): PrivacyScanner;
  get zkProofEngine(): ZKProofEngine;
  get chainAnalyzer(): ChainAnalyzer;
  get walletShield(): WalletShield;
  get obfuscationLayer(): ObfuscationLayer;
  
  // Network methods
  switchNetwork(network: string): Promise<void>;
  getCurrentNetwork(): string;
  getSupportedNetworks(): string[];
}
```

### PrivacyScanner

```typescript
interface PrivacyAnalysisResult {
  address: string;
  score: number; // 0-100 (higher = more private)
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  vulnerabilities: Vulnerability[];
  recommendations: Recommendation[];
  linkedAddresses: string[];
  exchangeInteractions: ExchangeInteraction[];
  lastUpdated: Date;
}

interface Vulnerability {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedTransactions: string[];
}

class PrivacyScanner {
  analyze(address: string): Promise<PrivacyAnalysisResult>;
  getExposureReport(address: string): Promise<ExposureReport>;
  getLinkedAddresses(address: string): Promise<LinkedAddressResult>;
  monitorAddress(address: string, callback: Function): void;
  stopMonitoring(address: string): void;
}
```

### ZKProofEngine

```typescript
interface ProofRequest {
  type: 'ownership' | 'balance' | 'transaction' | 'identity';
  claim: Record<string, any>;
  privateInputs: Record<string, any>;
  proofSystem?: 'groth16' | 'plonk' | 'stark';
}

interface Proof {
  proof: string;
  publicInputs: string[];
  verificationKey: string;
  proofSystem: string;
  createdAt: Date;
  expiresAt?: Date;
}

class ZKProofEngine {
  generateProof(request: ProofRequest): Promise<Proof>;
  verifyProof(proof: Proof): Promise<boolean>;
  exportProof(proof: Proof, format: 'json' | 'calldata'): string;
  getProofStatus(proofId: string): Promise<ProofStatus>;
}
```

### ChainAnalyzer

```typescript
interface TransactionAnalysis {
  hash: string;
  from: string;
  to: string;
  value: string;
  riskScore: number;
  patterns: Pattern[];
  relatedAddresses: string[];
  contractInteractions: ContractInteraction[];
}

class ChainAnalyzer {
  analyzeTransaction(txHash: string): Promise<TransactionAnalysis>;
  getTransactionHistory(address: string, options?: QueryOptions): Promise<Transaction[]>;
  buildTransactionGraph(address: string, depth?: number): Promise<TransactionGraph>;
  detectPatterns(address: string): Promise<Pattern[]>;
  getCrossChainActivity(address: string): Promise<CrossChainActivity>;
}
```

### WalletShield

```typescript
interface MonitorOptions {
  onThreatDetected?: (threat: Threat) => void;
  onApprovalChange?: (approval: Approval) => void;
  onHighRiskTransaction?: (tx: Transaction) => void;
  pollInterval?: number;
}

interface Threat {
  type: 'phishing' | 'malicious_contract' | 'rug_pull' | 'honeypot';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  details: Record<string, any>;
  timestamp: Date;
}

class WalletShield {
  monitor(address: string, options: MonitorOptions): void;
  stopMonitoring(address: string): void;
  getApprovals(address: string): Promise<Approval[]>;
  revokeApproval(address: string, spender: string, token: string): Promise<string>;
  simulateTransaction(tx: Transaction): Promise<SimulationResult>;
  checkContract(contractAddress: string): Promise<ContractRiskAssessment>;
}
```

### ObfuscationLayer

```typescript
interface StealthAddress {
  address: string;
  viewingKey: string;
  spendingKey: string;
  metadata: Record<string, any>;
}

class ObfuscationLayer {
  generateStealthAddress(): Promise<StealthAddress>;
  deriveAddress(stealthAddress: StealthAddress, ephemeralKey: string): string;
  stripMetadata(transaction: Transaction): Transaction;
  obfuscateAmount(amount: string): Promise<ObfuscatedAmount>;
  deobfuscateAmount(obfuscated: ObfuscatedAmount, key: string): string;
}
```

---

## Examples

### Complete Privacy Audit

```typescript
import { ObscuraSDK } from '@obscura/sdk';

async function performPrivacyAudit(address: string) {
  const obscura = new ObscuraSDK({
    apiKey: process.env.OBSCURA_API_KEY!,
    network: 'ethereum',
  });

  // Run comprehensive privacy analysis
  const scanner = obscura.privacyScanner;
  const analyzer = obscura.chainAnalyzer;

  // Get privacy score
  const privacyResult = await scanner.analyze(address);
  console.log(`Privacy Score: ${privacyResult.score}/100`);
  console.log(`Risk Level: ${privacyResult.riskLevel}`);

  // Get linked addresses
  console.log('\nLinked Addresses:');
  privacyResult.linkedAddresses.forEach((addr, i) => {
    console.log(`  ${i + 1}. ${addr}`);
  });

  // Get vulnerabilities
  console.log('\nVulnerabilities Found:');
  privacyResult.vulnerabilities.forEach((vuln) => {
    console.log(`  [${vuln.severity.toUpperCase()}] ${vuln.type}`);
    console.log(`    ${vuln.description}`);
  });

  // Get recommendations
  console.log('\nRecommendations:');
  privacyResult.recommendations.forEach((rec, i) => {
    console.log(`  ${i + 1}. ${rec.action}`);
  });

  // Get cross-chain activity
  const crossChain = await analyzer.getCrossChainActivity(address);
  console.log('\nCross-Chain Activity:');
  Object.entries(crossChain.networks).forEach(([network, activity]) => {
    console.log(`  ${network}: ${activity.transactionCount} transactions`);
  });
}
```

### Private Token Transfer

```typescript
import { ObscuraSDK } from '@obscura/sdk';
import { ethers } from 'ethers';

async function privateTransfer(
  signer: ethers.Signer,
  recipient: string,
  amount: string
) {
  const obscura = new ObscuraSDK({
    apiKey: process.env.OBSCURA_API_KEY!,
    network: 'ethereum',
  });

  const obfuscation = obscura.obfuscationLayer;
  const zkEngine = obscura.zkProofEngine;

  // Generate stealth address for recipient
  const stealthAddress = await obfuscation.generateStealthAddress();
  console.log('Stealth address generated:', stealthAddress.address);

  // Obfuscate the amount
  const obfuscatedAmount = await obfuscation.obfuscateAmount(amount);

  // Generate ZK proof of sufficient balance
  const balanceProof = await zkEngine.generateProof({
    type: 'balance',
    claim: {
      minBalance: amount,
      token: 'ETH',
    },
    privateInputs: {
      address: await signer.getAddress(),
      signature: await signer.signMessage('balance-verification'),
    },
  });

  console.log('Balance proof generated');
  console.log('Proof valid:', await zkEngine.verifyProof(balanceProof));

  // Execute private transfer (implementation depends on your contract)
  // This is a simplified example
  const tx = await signer.sendTransaction({
    to: stealthAddress.address,
    value: ethers.parseEther(amount),
  });

  console.log('Transaction sent:', tx.hash);
  return tx;
}
```

### Real-Time Threat Monitoring

```typescript
import { ObscuraSDK } from '@obscura/sdk';

async function startSecurityMonitoring(addresses: string[]) {
  const obscura = new ObscuraSDK({
    apiKey: process.env.OBSCURA_API_KEY!,
    network: 'ethereum',
  });

  const shield = obscura.walletShield;

  for (const address of addresses) {
    shield.monitor(address, {
      pollInterval: 10000, // Check every 10 seconds
      
      onThreatDetected: (threat) => {
        console.log(`[ALERT] Threat detected for ${address}`);
        console.log(`  Type: ${threat.type}`);
        console.log(`  Severity: ${threat.severity}`);
        console.log(`  Details:`, threat.details);
        
        // Send notification (implement your notification logic)
        sendNotification({
          title: 'Security Alert',
          body: `${threat.severity} threat detected: ${threat.type}`,
        });
      },

      onApprovalChange: (approval) => {
        console.log(`[INFO] Approval changed for ${address}`);
        console.log(`  Token: ${approval.token}`);
        console.log(`  Spender: ${approval.spender}`);
        console.log(`  Amount: ${approval.amount}`);
      },

      onHighRiskTransaction: (tx) => {
        console.log(`[WARNING] High risk transaction for ${address}`);
        console.log(`  Hash: ${tx.hash}`);
        console.log(`  Risk factors:`, tx.riskFactors);
      },
    });

    console.log(`Monitoring started for ${address}`);
  }
}
```

---

## Security

### Best Practices

1. **Never expose your API key** - Store it in environment variables
2. **Use HTTPS only** - All API communications are encrypted
3. **Validate proofs server-side** - Don't trust client-side verification alone
4. **Keep dependencies updated** - Run `npm audit` regularly
5. **Use stealth addresses** - For enhanced transaction privacy

### Audit Status

| Auditor | Date | Status | Report |
|---------|------|--------|--------|
| CertiK | Q3 2025 | Completed | [View Report](#) |
| Trail of Bits | Q4 2025 | Completed | [View Report](#) |

### Bug Bounty

We run an active bug bounty program. Report vulnerabilities to security@obscuraos.xyz

| Severity | Reward |
|----------|--------|
| Critical | Up to $50,000 |
| High | Up to $25,000 |
| Medium | Up to $10,000 |
| Low | Up to $2,500 |

---

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/obscuraos/sdk.git
cd sdk

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build

# Run linting
npm run lint
```

### Code Style

- We use TypeScript strict mode
- Follow the existing code patterns
- Write tests for new features
- Update documentation as needed

---

## Support

- **Documentation**: https://docs.obscuraos.xyz
- **Telegram**: https://t.me/obscura_os
- **Twitter**: https://twitter.com/obscuraos
- **Email**: help@obscuraos.xyz

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <img src="https://obscuraos.xyz/logo.png" alt="Obscura OS" width="100" />
  <br>
  <strong>Obscura OS</strong>
  <br>
  Privacy-First Web3 Operating System
  <br>
  <a href="https://obscuraos.xyz">obscuraos.xyz</a>
</p>
