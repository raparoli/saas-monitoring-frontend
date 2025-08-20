import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  HardDrive,
  Shield,
  Cloud,
  FileText,
  Server,
  Monitor,
  Laptop
} from 'lucide-react';

/**
 * Utility functions for getting appropriate icons
 */

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Sent': return CheckCircle;
    case 'Failed': return XCircle;
    case 'Pending': return Clock;
    default: return AlertCircle;
  }
};

export const getProductIcon = (productName: string) => {
  if (productName.includes('Acronis')) return HardDrive;
  if (productName.includes('Microsoft')) return Cloud;
  if (productName.includes('Bitdefender')) return Shield;
  return Shield;
};

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Security': return Shield;
    case 'Productivity': return FileText;
    case 'Backup': return HardDrive;
    case 'Email Security': return Shield;
    case 'System': return Server;
    case 'EDR': return Shield;
    case 'Network': return Cloud;
    default: return Cloud;
  }
};

export const getWorkloadIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'servers': return Server;
    case 'virtual machines':
    case 'vms': return Monitor;
    case 'workstations': return Laptop;
    default: return Server;
  }
};