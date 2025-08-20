import { 
  Shield, 
  FileText, 
  HardDrive, 
  Cloud, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  AlertTriangle
} from 'lucide-react';

// Icon mapping functions
export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Security': return Shield;
    case 'Productivity': return FileText;
    case 'Backup': return HardDrive;
    default: return Cloud;
  }
};

export const getProductIcon = (productName: string) => {
  if (productName.includes('Acronis')) return HardDrive;
  if (productName.includes('Microsoft')) return Cloud;
  if (productName.includes('Bitdefender')) return Shield;
  return Shield;
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Sent': return CheckCircle;
    case 'Failed': return XCircle;
    case 'Pending': return AlertCircle;
    default: return AlertCircle;
  }
};

export const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'Critical': return AlertCircle;
    case 'Error': return XCircle;
    case 'Warning': return AlertTriangle;
    case 'Info': return AlertCircle;
    default: return AlertCircle;
  }
};