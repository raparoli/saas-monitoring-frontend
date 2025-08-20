import { AlertEmailLog } from '../../../shared/types';

class AlertsService {
  private async mockDelay(ms: number = 800): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAlertEmailLogs(): Promise<{ data: AlertEmailLog[]; success: boolean; message?: string }> {
    await this.mockDelay(800);
    
    const mockAlertEmailLogs: AlertEmailLog[] = [
      {
        id: '1',
        alertId: 'A0B6A95F',
        productName: 'Acronis',
        severity: 'Critical',
        category: 'Backup',
        alertType: 'BackupFailed',
        customerName: 'Taurus Group',
        customerEmail: 'admin@taurusgroup.com',
        resourceName: 'DC-GPS.rasasigps.ae',
        emailSentAt: '2024-01-15T14:30:00Z',
        emailStatus: 'Sent',
        message: 'Backup operation failed for critical server',
        planName: 'Enterprise Backup Plan',
        deliveryAttempts: 1
      },
      {
        id: '2',
        alertId: 'B1C7D83A',
        productName: 'Microsoft',
        severity: 'Warning',
        category: 'Email Security',
        alertType: 'MalwareDetected',
        customerName: 'Global Industries',
        customerEmail: 'security@globalindustries.com',
        resourceName: 'MAIL-SVR-01',
        emailSentAt: '2024-01-15T13:45:00Z',
        emailStatus: 'Failed',
        message: 'Malware detected in incoming email',
        planName: 'Email Security Pro',
        deliveryAttempts: 3,
        lastAttempt: '2024-01-15T15:20:00Z',
        errorMessage: 'SMTP server connection timeout'
      },
      {
        id: '3',
        alertId: 'C2D8E94B',
        productName: 'Bitdefender',
        severity: 'Error',
        category: 'System',
        alertType: 'StorageFull',
        customerName: 'Tech Solutions Ltd',
        customerEmail: 'it@techsolutions.com',
        resourceName: 'STORAGE-CLUSTER-01',
        emailSentAt: '2024-01-15T12:15:00Z',
        emailStatus: 'Sent',
        message: 'Storage capacity at 95% - immediate attention required',
        planName: 'Infrastructure Monitor',
        deliveryAttempts: 1
      },
      {
        id: '4',
        alertId: 'D3E9F05C',
        productName: 'Zoho',
        severity: 'Info',
        category: 'Licensing',
        alertType: 'LicenseExpiring',
        customerName: 'Startup Ventures',
        customerEmail: 'admin@startupventures.com',
        resourceName: 'LICENSE-SERVER',
        emailSentAt: '2024-01-15T11:00:00Z',
        emailStatus: 'Pending',
        message: 'License expires in 30 days - renewal required',
        planName: 'Standard License',
        deliveryAttempts: 0
      },
      {
        id: '5',
        alertId: 'E4F0G16D',
        productName: 'Acronis',
        severity: 'Critical',
        category: 'EDR',
        alertType: 'ThreatDetected',
        customerName: 'Financial Corp',
        customerEmail: 'security@financialcorp.com',
        resourceName: 'WORKSTATION-045',
        emailSentAt: '2024-01-15T10:30:00Z',
        emailStatus: 'Sent',
        message: 'Advanced persistent threat detected on endpoint',
        planName: 'EDR Advanced',
        deliveryAttempts: 1
      }
    ];
    
    return {
      success: true,
      data: mockAlertEmailLogs
    };
  }
}

export const alertsService = new AlertsService();