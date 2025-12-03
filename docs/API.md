# Obscura OS SDK - API Documentation

Complete API reference for the Obscura OS SDK.

## Table of Contents

- [ObscuraSDK](#obscurasdk)
- [PrivacyScanner](#privacyscanner)
- [ZKProofEngine](#zkproofengine)
- [ChainAnalyzer](#chainanalyzer)
- [WalletShield](#walletshield)
- [ObfuscationLayer](#obfuscationlayer)
- [Types](#types)
- [Errors](#errors)

---

## ObscuraSDK

Main SDK class for initialization and configuration.

### Constructor

```typescript
new ObscuraSDK(config: ObscuraConfig)
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| config.apiKey | string | Yes | Your Obscura API key |
| config.network | NetworkType | Yes | Initial network |
| config.options.enableLogging | boolean | No | Enable console logging |
| config.options.cacheEnabled | boolean | No | Enable response caching |
| config.options.cacheTTL | number | No | Cache TTL in seconds |
| config.options.rpcUrl | string | No | Custom RPC URL |

**Example:**

```typescript
const obscura = new ObscuraSDK({
  apiKey: 'obs_xxxxxxxxxxxxx',
  network: 'ethereum',
  options: {
    enableLogging: true,
    cacheEnabled: true,
    cacheTTL: 300,
  },
});
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| privacyScanner | PrivacyScanner | Privacy analysis module |
| zkProofEngine | ZKProofEngine | ZK proof module |
| chainAnalyzer | ChainAnalyzer | Chain analysis module |
| walletShield | WalletShield | Wallet protection module |
| obfuscationLayer | ObfuscationLayer | Obfuscation utilities |

### Methods

#### switchNetwork

Switch to a different blockchain network.

```typescript
async switchNetwork(network: NetworkType): Promise<void>
```

#### getCurrentNetwork

Get the current network.

```typescript
getCurrentNetwork(): NetworkType
```

#### getSupportedNetworks

Get list of all supported networks.

```typescript
getSupportedNetworks(): NetworkType[]
```

#### getNetworkDetails

Get details for a specific network.

```typescript
getNetworkDetails(network?: NetworkType): SupportedNetwork
```

---

## PrivacyScanner

Analyze addresses for privacy vulnerabilities.

### analyze

Perform comprehensive privacy analysis on an address.

```typescript
async analyze(address: string): Promise<PrivacyAnalysisResult>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| address | string | Ethereum address (0x...) |

**Returns:** `PrivacyAnalysisResult`

**Example:**

```typescript
const result = await obscura.privacyScanner.analyze(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f1Ab23'
);

console.log(result.score); // 75
console.log(result.riskLevel); // 'medium'
```

### getExposureReport

Get detailed exposure report.

```typescript
async getExposureReport(address: string): Promise<ExposureReport>
```

### getLinkedAddresses

Find addresses linked to the target.

```typescript
async getLinkedAddresses(address: string): Promise<LinkedAddressResult>
```

### monitorAddress

Start monitoring an address for privacy changes.

```typescript
monitorAddress(
  address: string,
  callback: (result: PrivacyAnalysisResult) => void,
  interval?: number
): void
```

### stopMonitoring

Stop monitoring an address.

```typescript
stopMonitoring(address: string): void
```

---

## ZKProofEngine

Generate and verify zero-knowledge proofs.

### generateProof

Generate a new ZK proof.

```typescript
async generateProof(request: ProofRequest): Promise<Proof>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| request.type | ProofType | Type of proof |
| request.claim | object | Public claim to prove |
| request.privateInputs | object | Private data (not revealed) |
| request.proofSystem | ProofSystem | Proof system to use |

**Proof Types:**
- `ownership` - Prove ownership of an asset
- `balance` - Prove minimum balance
- `transaction` - Prove transaction occurred
- `identity` - Prove identity attributes

**Example:**

```typescript
const proof = await obscura.zkProofEngine.generateProof({
  type: 'balance',
  claim: {
    minBalance: '10.0',
    token: 'ETH',
  },
  privateInputs: {
    address: '0x...',
    signature: '0x...',
  },
  proofSystem: 'groth16',
});
```

### verifyProof

Verify a ZK proof.

```typescript
async verifyProof(proof: Proof): Promise<boolean>
```

### exportProof

Export proof in a specific format.

```typescript
exportProof(proof: Proof, format: 'json' | 'calldata'): string
```

### getProofStatus

Check status of a proof generation job.

```typescript
async getProofStatus(proofId: string): Promise<ProofStatus>
```

### estimateVerificationGas

Estimate gas for on-chain verification.

```typescript
async estimateVerificationGas(proof: Proof): Promise<string>
```

---

## ChainAnalyzer

Multi-chain transaction analysis.

### analyzeTransaction

Analyze a specific transaction.

```typescript
async analyzeTransaction(txHash: string): Promise<TransactionAnalysis>
```

### getTransactionHistory

Get transaction history for an address.

```typescript
async getTransactionHistory(
  address: string,
  options?: QueryOptions
): Promise<Transaction[]>
```

**Query Options:**

| Name | Type | Description |
|------|------|-------------|
| limit | number | Max results |
| offset | number | Skip results |
| startBlock | number | Start block |
| endBlock | number | End block |
| startDate | Date | Start date |
| endDate | Date | End date |

### buildTransactionGraph

Build a transaction graph.

```typescript
async buildTransactionGraph(
  address: string,
  depth?: number
): Promise<TransactionGraph>
```

### detectPatterns

Detect behavioral patterns.

```typescript
async detectPatterns(address: string): Promise<Pattern[]>
```

### getCrossChainActivity

Get cross-chain activity.

```typescript
async getCrossChainActivity(address: string): Promise<CrossChainActivity>
```

---

## WalletShield

Real-time wallet protection.

### monitor

Start monitoring a wallet.

```typescript
monitor(address: string, options: MonitorOptions): void
```

**Monitor Options:**

| Name | Type | Description |
|------|------|-------------|
| onThreatDetected | function | Called when threat found |
| onApprovalChange | function | Called on approval change |
| onHighRiskTransaction | function | Called on risky tx |
| pollInterval | number | Poll interval in ms |

**Example:**

```typescript
obscura.walletShield.monitor('0x...', {
  pollInterval: 10000,
  onThreatDetected: (threat) => {
    console.log('Threat:', threat.type, threat.severity);
  },
});
```

### stopMonitoring

Stop monitoring a wallet.

```typescript
stopMonitoring(address: string): void
```

### getApprovals

Get all token approvals.

```typescript
async getApprovals(address: string): Promise<Approval[]>
```

### revokeApproval

Generate revoke transaction data.

```typescript
async revokeApproval(
  address: string,
  spender: string,
  token: string
): Promise<string>
```

### simulateTransaction

Simulate a transaction.

```typescript
async simulateTransaction(tx: Partial<Transaction>): Promise<SimulationResult>
```

### checkContract

Check a contract for risks.

```typescript
async checkContract(contractAddress: string): Promise<ContractRiskAssessment>
```

---

## ObfuscationLayer

Privacy enhancement utilities.

### generateStealthAddress

Generate a new stealth address.

```typescript
async generateStealthAddress(): Promise<StealthAddress>
```

### deriveAddress

Derive a one-time address.

```typescript
deriveAddress(stealthAddress: StealthAddress, ephemeralKey: string): string
```

### stripMetadata

Remove metadata from transaction.

```typescript
stripMetadata(transaction: Transaction): Transaction
```

### obfuscateAmount

Obfuscate a transaction amount.

```typescript
async obfuscateAmount(amount: string): Promise<ObfuscatedAmount>
```

### deobfuscateAmount

Reveal an obfuscated amount.

```typescript
async deobfuscateAmount(
  obfuscated: ObfuscatedAmount,
  key: string
): Promise<string>
```

### maskAddress

Mask an address for display.

```typescript
maskAddress(address: string, options?: MaskingOptions): string
```

**Masking Levels:**
- `basic`: `0x742d...Ab23`
- `enhanced`: `0x74****23`
- `maximum`: `0x****...****`

### encrypt

Encrypt data.

```typescript
async encrypt(data: string, publicKey: string): Promise<string>
```

### decrypt

Decrypt data.

```typescript
async decrypt(encryptedData: string, privateKey: string): Promise<string>
```

---

## Types

### NetworkType

```typescript
type NetworkType = 'ethereum' | 'polygon' | 'arbitrum' | 'optimism' | 'bsc';
```

### RiskLevel

```typescript
type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
```

### Severity

```typescript
type Severity = 'low' | 'medium' | 'high' | 'critical';
```

### ProofType

```typescript
type ProofType = 'ownership' | 'balance' | 'transaction' | 'identity';
```

### ProofSystem

```typescript
type ProofSystem = 'groth16' | 'plonk' | 'stark';
```

### ThreatType

```typescript
type ThreatType = 'phishing' | 'malicious_contract' | 'rug_pull' | 'honeypot';
```

---

## Errors

### ObscuraError

Base error class.

```typescript
class ObscuraError extends Error {
  code: string;
  details?: Record<string, any>;
}
```

### NetworkError

Network-related errors.

```typescript
class NetworkError extends ObscuraError {
  // code: 'NETWORK_ERROR'
}
```

### ValidationError

Input validation errors.

```typescript
class ValidationError extends ObscuraError {
  // code: 'VALIDATION_ERROR'
}
```

### AuthenticationError

Authentication failures.

```typescript
class AuthenticationError extends ObscuraError {
  // code: 'AUTH_ERROR'
}
```

---

## Rate Limits

| Plan | Requests/min | Requests/day |
|------|--------------|--------------|
| Free | 60 | 1,000 |
| Pro | 300 | 50,000 |
| Enterprise | Unlimited | Unlimited |

---

## Support

- Documentation: https://docs.obscuraos.xyz
- Telegram: https://t.me/obscura_os
- Email: help@obscuraos.xyz
