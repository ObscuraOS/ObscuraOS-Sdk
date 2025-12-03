/**
 * Basic Usage Example
 * 
 * This example demonstrates the fundamental features of the Obscura OS SDK.
 */

import { ObscuraSDK } from '@obscura/sdk';

async function main() {
  // Initialize the SDK
  const obscura = new ObscuraSDK({
    apiKey: process.env.OBSCURA_API_KEY!,
    network: 'ethereum',
    options: {
      enableLogging: true,
      cacheEnabled: true,
    },
  });

  console.log('Obscura SDK initialized');
  console.log('Current network:', obscura.getCurrentNetwork());
  console.log('Supported networks:', obscura.getSupportedNetworks());

  // Example address (replace with a real address)
  const address = '0x742d35Cc6634C0532925a3b844Bc9e7595f1Ab23';

  try {
    // ============================================
    // Privacy Scanner Example
    // ============================================
    console.log('\n--- Privacy Scanner ---');
    
    const privacyResult = await obscura.privacyScanner.analyze(address);
    
    console.log(`Privacy Score: ${privacyResult.score}/100`);
    console.log(`Risk Level: ${privacyResult.riskLevel}`);
    console.log(`Linked Addresses: ${privacyResult.linkedAddresses.length}`);
    
    if (privacyResult.vulnerabilities.length > 0) {
      console.log('\nVulnerabilities:');
      privacyResult.vulnerabilities.forEach((v) => {
        console.log(`  [${v.severity}] ${v.type}: ${v.description}`);
      });
    }

    if (privacyResult.recommendations.length > 0) {
      console.log('\nRecommendations:');
      privacyResult.recommendations.forEach((r, i) => {
        console.log(`  ${i + 1}. ${r.action}`);
      });
    }

    // ============================================
    // Chain Analyzer Example
    // ============================================
    console.log('\n--- Chain Analyzer ---');
    
    const crossChain = await obscura.chainAnalyzer.getCrossChainActivity(address);
    
    console.log('Cross-chain activity:');
    Object.entries(crossChain.networks).forEach(([network, activity]) => {
      console.log(`  ${network}: ${activity.transactionCount} transactions`);
    });

    // ============================================
    // Wallet Shield Example
    // ============================================
    console.log('\n--- Wallet Shield ---');
    
    const approvals = await obscura.walletShield.getApprovals(address);
    
    console.log(`Token approvals: ${approvals.length}`);
    approvals.forEach((approval) => {
      console.log(`  ${approval.tokenSymbol}: ${approval.isUnlimited ? 'Unlimited' : approval.amount}`);
    });

    // ============================================
    // Obfuscation Layer Example
    // ============================================
    console.log('\n--- Obfuscation Layer ---');
    
    const masked = obscura.obfuscationLayer.maskAddress(address);
    console.log(`Masked address: ${masked}`);
    
    const stealthAddress = await obscura.obfuscationLayer.generateStealthAddress();
    console.log(`Stealth address: ${stealthAddress.address}`);

  } catch (error) {
    console.error('Error:', error);
  }
}

main().catch(console.error);
