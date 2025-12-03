# Obscura OS SDK Architecture

## Overview

The Obscura OS SDK is designed with modularity, extensibility, and security as core principles. This document provides a deep dive into the architectural decisions and component structure.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT APPLICATION                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              OBSCURA SDK                                     │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         SDK ENTRY POINT                              │   │
│  │                         (ObscuraSDK class)                           │   │
│  │  • Configuration management                                          │   │
│  │  • Module initialization                                             │   │
│  │  • Network switching                                                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                      │                                      │
│         ┌────────────────────────────┼────────────────────────────┐        │
│         │                            │                            │        │
│         ▼                            ▼                            ▼        │
│  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐          │
│  │ PrivacyScanner  │   │  ZKProofEngine  │   │  ChainAnalyzer  │          │
│  │                 │   │                 │   │                 │          │
│  │ • analyze()     │   │ • generateProof │   │ • analyzeTransaction │     │
│  │ • getExposure() │   │ • verifyProof() │   │ • buildGraph()  │          │
│  │ • monitor()     │   │ • exportProof() │   │ • detectPatterns│          │
│  └─────────────────┘   └─────────────────┘   └─────────────────┘          │
│         │                            │                            │        │
│         ▼                            ▼                            ▼        │
│  ┌─────────────────┐   ┌─────────────────┐                                │
│  │  WalletShield   │   │ObfuscationLayer │                                │
│  │                 │   │                 │                                │
│  │ • monitor()     │   │ • stealthAddr() │                                │
│  │ • simulate()    │   │ • obfuscate()   │                                │
│  │ • checkContract │   │ • encrypt()     │                                │
│  └─────────────────┘   └─────────────────┘                                │
│         │                            │                                      │
│         └────────────────────────────┘                                      │
│                            │                                                │
│                            ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          BASE MODULE                                 │   │
│  │                                                                      │   │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐   │   │
│  │  │   HTTP Client    │  │   Cache Layer    │  │    Validation    │   │   │
│  │  │                  │  │                  │  │                  │   │   │
│  │  │ • Request/Response│  │ • TTL-based     │  │ • Address        │   │   │
│  │  │ • Interceptors   │  │ • Key-based     │  │ • Transaction    │   │   │
│  │  │ • Retry logic    │  │ • Auto-invalidate│  │ • Proof          │   │   │
│  │  └──────────────────┘  └──────────────────┘  └──────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                      │                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            OBSCURA API GATEWAY                               │
│                         (api.obscuraos.xyz/v1)                               │
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Rate Limiter│  │    Auth     │  │   Router    │  │    CORS     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                      │                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          │                           │                           │
          ▼                           ▼                           ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│  Privacy Engine │       │   ZK Circuits   │       │  Chain Indexers │
│                 │       │                 │       │                 │
│ • Graph analysis│       │ • Groth16       │       │ • Ethereum      │
│ • Risk scoring  │       │ • PLONK         │       │ • Polygon       │
│ • Pattern match │       │ • STARK         │       │ • Arbitrum      │
└─────────────────┘       └─────────────────┘       │ • Optimism      │
                                                    │ • BSC           │
                                                    └─────────────────┘
```

## Component Details

### 1. SDK Entry Point (ObscuraSDK)

The main class that initializes and orchestrates all SDK modules.

**Responsibilities:**
- Configuration validation and management
- Lazy initialization of modules
- Network switching across modules
- Version management

**Design Patterns:**
- Singleton for configuration
- Lazy Loading for modules
- Factory Method for module creation

```typescript
class ObscuraSDK {
  private _privacyScanner: PrivacyScanner | null = null;
  
  get privacyScanner(): PrivacyScanner {
    if (!this._privacyScanner) {
      this._privacyScanner = new PrivacyScanner(this.config);
    }
    return this._privacyScanner;
  }
}
```

### 2. Base Module

Abstract class providing common functionality for all modules.

**Features:**
- HTTP client with interceptors
- Response caching with TTL
- Logging utilities
- Error handling

**Design Patterns:**
- Template Method for request handling
- Strategy for caching
- Decorator for logging

### 3. Privacy Scanner

Analyzes wallet addresses for privacy vulnerabilities.

**Core Algorithms:**
- Graph-based address clustering
- Heuristic-based linking detection
- Risk scoring model

**Data Flow:**
```
Address Input → Validation → API Request → Risk Calculation → Result
                                ↓
                    [Cache Check] → [API Call] → [Cache Store]
```

### 4. ZK Proof Engine

Handles zero-knowledge proof generation and verification.

**Supported Proof Systems:**

| System | Use Case | Verification Gas |
|--------|----------|------------------|
| Groth16 | General purpose, smallest proofs | ~200k |
| PLONK | Universal setup, updatable | ~300k |
| STARK | Post-quantum secure, larger proofs | ~500k |

**Proof Generation Flow:**
```
Request → Validate → Circuit Selection → Witness Generation → Proof Creation → Verification Key
```

### 5. Chain Analyzer

Multi-chain transaction analysis and pattern detection.

**Supported Chains:**
- Ethereum Mainnet (chainId: 1)
- Polygon (chainId: 137)
- Arbitrum One (chainId: 42161)
- Optimism (chainId: 10)
- BNB Smart Chain (chainId: 56)

**Analysis Capabilities:**
- Transaction graph construction
- Pattern recognition (mixer detection, wash trading, etc.)
- Cross-chain activity tracking
- Address clustering

### 6. Wallet Shield

Real-time wallet protection and monitoring.

**Monitoring Architecture:**
```
┌─────────────────────────────────────────────────┐
│              Wallet Shield Monitor               │
│                                                 │
│  ┌─────────────┐     ┌─────────────────────┐   │
│  │ Poll Timer  │────▶│   Threat Detection  │   │
│  │ (Interval)  │     │   Pipeline          │   │
│  └─────────────┘     └─────────────────────┘   │
│                              │                  │
│         ┌───────────────────┼───────────────┐  │
│         ▼                   ▼               ▼  │
│  ┌─────────────┐   ┌─────────────┐   ┌───────┐│
│  │ Phishing    │   │ Malicious   │   │ Rug   ││
│  │ Detection   │   │ Contract    │   │ Pull  ││
│  └─────────────┘   └─────────────┘   └───────┘│
│                              │                  │
│                              ▼                  │
│                    ┌─────────────────┐         │
│                    │    Callbacks    │         │
│                    │                 │         │
│                    │ onThreatDetected│         │
│                    │ onApprovalChange│         │
│                    │ onHighRiskTx    │         │
│                    └─────────────────┘         │
└─────────────────────────────────────────────────┘
```

### 7. Obfuscation Layer

Privacy enhancement utilities.

**Stealth Address Protocol:**
```
1. Generate ephemeral keypair (r, R)
2. Compute shared secret: S = r * B (recipient's public key)
3. Derive one-time address: P = H(S) * G + A
4. Recipient scans with viewing key
```

**Encryption Suite:**
- AES-256-GCM for data encryption
- ChaCha20-Poly1305 for streaming
- ECDH for key exchange
- Ed25519 for signatures

## Security Considerations

### API Key Security
- Keys are never logged or exposed
- Transmitted via secure headers
- Rate limited per key

### Data Privacy
- No private keys stored or transmitted
- Minimal data retention
- End-to-end encryption for sensitive data

### Network Security
- HTTPS only
- Certificate pinning recommended
- Request signing for critical operations

## Performance Optimization

### Caching Strategy
```
Request → Check Cache → [Hit] → Return Cached
                      → [Miss] → API Call → Store Cache → Return
```

**Cache Configuration:**
- Default TTL: 300 seconds
- Key format: `${method}:${endpoint}:${hash(params)}`
- Automatic invalidation on network switch

### Connection Pooling
- HTTP/2 support
- Keep-alive connections
- Connection reuse

## Error Handling

### Error Hierarchy
```
ObscuraError (base)
├── NetworkError
├── ValidationError
├── AuthenticationError
└── ProofError
```

### Retry Strategy
- Exponential backoff for network errors
- Max 3 retries
- No retry for validation/auth errors

## Extensibility

### Adding New Modules
1. Extend `BaseModule`
2. Implement module-specific methods
3. Add to `ObscuraSDK` as getter
4. Export types

### Custom Proof Systems
1. Implement `ProofSystem` interface
2. Register with `ZKProofEngine`
3. Handle serialization

## Testing Strategy

### Unit Tests
- Module methods
- Validation logic
- Error handling

### Integration Tests
- API communication
- Cache behavior
- Cross-module interactions

### E2E Tests
- Full workflow scenarios
- Multi-network operations
- Real API calls (staging)

---

## Further Reading

- [API Reference](../README.md#api-reference)
- [Examples](../examples/)
- [Contributing Guide](../CONTRIBUTING.md)
