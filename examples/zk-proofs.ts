/**
 * Zero-Knowledge Proofs Example
 * 
 * This example demonstrates how to generate and verify ZK proofs
 * using the Obscura OS SDK.
 */

import { ObscuraSDK } from '@obscura/sdk';

async function main() {
  const obscura = new ObscuraSDK({
    apiKey: process.env.OBSCURA_API_KEY!,
    network: 'ethereum',
    options: {
      enableLogging: true,
    },
  });

  const zkEngine = obscura.zkProofEngine;

  console.log('=== Zero-Knowledge Proof Examples ===\n');

  try {
    // ============================================
    // Example 1: Proof of Ownership
    // ============================================
    console.log('1. Proof of Ownership');
    console.log('-'.repeat(40));

    const ownershipProof = await zkEngine.generateProof({
      type: 'ownership',
      claim: {
        asset: 'NFT',
        collection: '0x1234...', // NFT contract address
        tokenId: '42',
      },
      privateInputs: {
        address: '0x742d35Cc6634C0532925a3b844Bc9e7595f1Ab23',
        signature: '0xabc123...', // Signature proving ownership
      },
      proofSystem: 'groth16',
    });

    console.log('Proof generated successfully!');
    console.log('Proof ID:', ownershipProof.id);
    console.log('Proof system:', ownershipProof.proofSystem);

    // Verify the proof
    const isOwnershipValid = await zkEngine.verifyProof(ownershipProof);
    console.log('Proof valid:', isOwnershipValid);

    // ============================================
    // Example 2: Proof of Balance
    // ============================================
    console.log('\n2. Proof of Balance');
    console.log('-'.repeat(40));

    const balanceProof = await zkEngine.generateProof({
      type: 'balance',
      claim: {
        minBalance: '10.0',
        token: 'ETH',
      },
      privateInputs: {
        address: '0x742d35Cc6634C0532925a3b844Bc9e7595f1Ab23',
        actualBalance: '25.5', // The real balance (kept private)
        signature: '0xdef456...',
      },
      proofSystem: 'plonk',
    });

    console.log('Balance proof generated!');
    console.log('Public inputs:', balanceProof.publicInputs);

    const isBalanceValid = await zkEngine.verifyProof(balanceProof);
    console.log('Proof valid:', isBalanceValid);

    // ============================================
    // Example 3: Proof of Transaction
    // ============================================
    console.log('\n3. Proof of Transaction');
    console.log('-'.repeat(40));

    const txProof = await zkEngine.generateProof({
      type: 'transaction',
      claim: {
        fromAddressHash: '0xhash...', // Hashed address
        minAmount: '1.0',
        token: 'USDC',
        afterDate: '2024-01-01',
      },
      privateInputs: {
        transactionHash: '0xtxhash...',
        fromAddress: '0x...',
        toAddress: '0x...',
        amount: '5.0',
        timestamp: '2024-06-15',
      },
    });

    console.log('Transaction proof generated!');
    
    // Export proof as calldata for on-chain verification
    const calldata = zkEngine.exportProof(txProof, 'calldata');
    console.log('Calldata length:', calldata.length, 'bytes');

    // ============================================
    // Example 4: Proof of Identity (KYC)
    // ============================================
    console.log('\n4. Proof of Identity');
    console.log('-'.repeat(40));

    const identityProof = await zkEngine.generateProof({
      type: 'identity',
      claim: {
        ageOver: 18,
        countryNotIn: ['XX', 'YY'], // Sanctioned countries
        kycLevel: 'verified',
      },
      privateInputs: {
        fullName: 'John Doe', // Kept private
        dateOfBirth: '1990-01-01', // Kept private
        country: 'US', // Kept private
        kycProvider: 'provider-xyz',
        kycSignature: '0x...',
      },
    });

    console.log('Identity proof generated!');
    console.log('Expires at:', identityProof.expiresAt);

    // Verify
    const isIdentityValid = await zkEngine.verifyProof(identityProof);
    console.log('Proof valid:', isIdentityValid);

    // ============================================
    // Gas Estimation for On-Chain Verification
    // ============================================
    console.log('\n5. Gas Estimation');
    console.log('-'.repeat(40));

    const gasEstimate = await zkEngine.estimateVerificationGas(balanceProof);
    console.log('Estimated gas for verification:', gasEstimate);

    // ============================================
    // Export Proof as JSON
    // ============================================
    console.log('\n6. Export Proof');
    console.log('-'.repeat(40));

    const jsonExport = zkEngine.exportProof(balanceProof, 'json');
    console.log('JSON export preview:');
    console.log(jsonExport.substring(0, 200) + '...');

  } catch (error) {
    console.error('Error:', error);
  }
}

main().catch(console.error);
