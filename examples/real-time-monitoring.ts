/**
 * Real-Time Monitoring Example
 * 
 * This example demonstrates how to set up real-time wallet monitoring
 * for threats, approval changes, and suspicious transactions.
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

  const walletShield = obscura.walletShield;
  const privacyScanner = obscura.privacyScanner;

  // Wallets to monitor
  const walletsToMonitor = [
    '0x742d35Cc6634C0532925a3b844Bc9e7595f1Ab23',
    '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
  ];

  console.log('=== Real-Time Wallet Monitoring ===\n');
  console.log(`Monitoring ${walletsToMonitor.length} wallets...\n`);

  // ============================================
  // Set up Wallet Shield Monitoring
  // ============================================
  for (const address of walletsToMonitor) {
    console.log(`Starting monitoring for ${address.slice(0, 10)}...`);

    walletShield.monitor(address, {
      pollInterval: 15000, // Check every 15 seconds

      onThreatDetected: (threat) => {
        console.log('\n🚨 THREAT DETECTED 🚨');
        console.log(`Address: ${address}`);
        console.log(`Type: ${threat.type}`);
        console.log(`Severity: ${threat.severity}`);
        console.log(`Source: ${threat.source}`);
        console.log(`Time: ${threat.timestamp.toISOString()}`);
        console.log('Details:', JSON.stringify(threat.details, null, 2));

        // In production, you would send notifications here
        sendNotification({
          type: 'threat',
          title: `${threat.severity.toUpperCase()} Threat Detected`,
          body: `${threat.type} detected for wallet ${address.slice(0, 10)}...`,
          data: threat,
        });
      },

      onApprovalChange: (approval) => {
        console.log('\n📝 APPROVAL CHANGE');
        console.log(`Address: ${address}`);
        console.log(`Token: ${approval.tokenSymbol} (${approval.token})`);
        console.log(`Spender: ${approval.spenderName || approval.spender}`);
        console.log(`Amount: ${approval.isUnlimited ? 'UNLIMITED ⚠️' : approval.amount}`);
        console.log(`Updated: ${approval.lastUpdated.toISOString()}`);

        // Warn about unlimited approvals
        if (approval.isUnlimited) {
          sendNotification({
            type: 'warning',
            title: 'Unlimited Token Approval',
            body: `Unlimited ${approval.tokenSymbol} approval detected`,
            data: approval,
          });
        }
      },

      onHighRiskTransaction: (tx) => {
        console.log('\n⚠️ HIGH RISK TRANSACTION');
        console.log(`Address: ${address}`);
        console.log(`Hash: ${tx.hash}`);
        console.log(`From: ${tx.from}`);
        console.log(`To: ${tx.to}`);
        console.log(`Value: ${tx.value}`);
        console.log(`Time: ${tx.timestamp.toISOString()}`);

        sendNotification({
          type: 'high-risk',
          title: 'High Risk Transaction Detected',
          body: `Transaction ${tx.hash.slice(0, 10)}... flagged as high risk`,
          data: tx,
        });
      },
    });
  }

  // ============================================
  // Set up Privacy Monitoring
  // ============================================
  for (const address of walletsToMonitor) {
    privacyScanner.monitorAddress(
      address,
      (result) => {
        console.log(`\n🔒 Privacy Update for ${address.slice(0, 10)}...`);
        console.log(`Score: ${result.score}/100 (${result.riskLevel})`);

        // Alert on significant privacy changes
        if (result.riskLevel === 'high' || result.riskLevel === 'critical') {
          sendNotification({
            type: 'privacy-alert',
            title: 'Privacy Risk Alert',
            body: `Privacy score dropped to ${result.score} (${result.riskLevel})`,
            data: result,
          });
        }
      },
      60000 // Check every 60 seconds
    );
  }

  console.log('\n✅ All monitors started successfully');
  console.log('Press Ctrl+C to stop monitoring\n');

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\nStopping monitors...');
    
    for (const address of walletsToMonitor) {
      walletShield.stopMonitoring(address);
      privacyScanner.stopMonitoring(address);
    }
    
    console.log('Monitors stopped. Goodbye!');
    process.exit(0);
  });

  // Keep the process running
  await new Promise(() => {});
}

// Mock notification function - implement with your preferred service
function sendNotification(notification: {
  type: string;
  title: string;
  body: string;
  data: any;
}) {
  // In production, integrate with:
  // - Push notifications (Firebase, OneSignal)
  // - Email (SendGrid, SES)
  // - SMS (Twilio)
  // - Slack/Discord webhooks
  // - Telegram bot
  
  console.log(`\n📬 Notification sent: [${notification.type}] ${notification.title}`);
}

main().catch(console.error);
