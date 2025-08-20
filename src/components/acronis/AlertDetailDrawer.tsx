import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../../shared/components/ui/sheet';
import { Button } from '../../shared/components/ui/button';
import { Badge } from '../../shared/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../shared/components/ui/card';
import { Separator } from '../../shared/components/ui/separator';
import { ScrollArea } from '../../shared/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../shared/components/ui/table';
import { Alert } from './types';
import { 
  AlertTriangle, 
  Calendar, 
  Clock, 
  Database, 
  FileText, 
  HardDrive, 
  Info, 
  MapPin, 
  Server, 
  Shield, 
  User, 
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  Copy,
  Download
} from 'lucide-react';
import { getSeverityIcon, getSeverityColor, formatDateTime } from './utils';

interface AlertDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAlert: Alert | null;
}

export function AlertDetailDrawer({ isOpen, onClose, selectedAlert }: AlertDetailDrawerProps) {
  if (!selectedAlert) return null;

  const getSeverityDetails = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          description: 'Requires immediate attention'
        };
      case 'Error':
        return {
          icon: XCircle,
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          description: 'System failure detected'
        };
      case 'Warning':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          description: 'Potential issue requiring monitoring'
        };
      case 'Info':
        return {
          icon: Info,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          description: 'General information'
        };
      default:
        return {
          icon: Info,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          description: 'Unknown severity'
        };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Backup':
        return HardDrive;
      case 'Email Security':
        return Shield;
      case 'System':
        return Server;
      case 'EDR':
        return Shield;
      case 'Network':
        return Database;
      default:
        return FileText;
    }
  };

  const getAlertTypeDescription = (type: string) => {
    switch (type) {
      case 'BackupFailed':
        return 'A scheduled backup operation has failed to complete successfully.';
      case 'NoBackupForXDays':
        return 'No backup has been performed for an extended period, indicating potential issues.';
      case 'MalwareDetected':
        return 'Malicious software has been detected in the protected environment.';
      case 'StorageFull':
        return 'Storage capacity is at or near maximum, requiring attention.';
      case 'ConnectionLost':
        return 'Connection to the protected resource has been interrupted.';
      case 'LicenseExpiring':
        return 'License is approaching expiration and requires renewal.';
      default:
        return 'Alert details and description.';
    }
  };

  const generateMockDetails = (alert: Alert) => {
    return {
      impact: alert.severity === 'Critical' ? 'High' : alert.severity === 'Error' ? 'Medium' : 'Low',
      affectedUsers: Math.floor(Math.random() * 50) + 1,
      estimatedResolution: alert.severity === 'Critical' ? '15 minutes' : alert.severity === 'Error' ? '1 hour' : '4 hours',
      firstOccurrence: alert.createdDate,
      lastOccurrence: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      occurrenceCount: Math.floor(Math.random() * 10) + 1,
      assignedTo: 'IT Operations Team',
      status: Math.random() > 0.3 ? 'Open' : 'In Progress',
      resolution: alert.severity === 'Info' ? 'Information acknowledged' : undefined
    };
  };

  const severityDetails = getSeverityDetails(selectedAlert.severity);
  const SeverityIcon = severityDetails.icon;
  const CategoryIcon = getCategoryIcon(selectedAlert.category);
  const mockDetails = generateMockDetails(selectedAlert);

  const relatedAlerts = [
    {
      id: '1',
      type: 'BackupFailed',
      severity: 'Warning',
      time: '2 hours ago',
      resource: selectedAlert.resourceName
    },
    {
      id: '2',
      type: 'ConnectionLost',
      severity: 'Error',
      time: '5 hours ago',
      resource: selectedAlert.resourceName
    }
  ];

  const resolutionSteps = [
    {
      step: 1,
      title: 'Initial Assessment',
      description: 'Review alert details and assess impact scope',
      status: 'completed',
      timestamp: '10 minutes ago'
    },
    {
      step: 2,
      title: 'Resource Investigation',
      description: 'Examine affected resource and connection status',
      status: 'in-progress',
      timestamp: '5 minutes ago'
    },
    {
      step: 3,
      title: 'Resolution Implementation',
      description: 'Apply corrective measures and monitor results',
      status: 'pending',
      timestamp: ''
    }
  ];

  const handleCopyAlertId = () => {
    navigator.clipboard.writeText(selectedAlert.id);
  };

  const handleExportDetails = () => {
    const exportData = {
      alert: selectedAlert,
      details: mockDetails,
      exportTime: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alert-${selectedAlert.id}-details.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl lg:max-w-4xl">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`flex items-center justify-center w-10 h-10 ${severityDetails.bgColor} ${severityDetails.borderColor} border rounded-xl`}>
                <SeverityIcon className={`w-5 h-5 ${severityDetails.color}`} />
              </div>
              <div>
                <SheetTitle className="text-xl">Alert Details</SheetTitle>
                <SheetDescription>
                  Comprehensive information about alert #{selectedAlert.id}
                </SheetDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopyAlertId}>
                <Copy className="w-4 h-4 mr-1" />
                Copy ID
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportDetails}>
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="h-full pr-6">
          <div className="space-y-6 mt-6">
            {/* Alert Overview */}
            <Card className={`${severityDetails.borderColor} border-2`}>
              <CardHeader className={severityDetails.bgColor}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CategoryIcon className="w-6 h-6 text-gray-600" />
                    <div>
                      <CardTitle className="text-lg">{selectedAlert.type}</CardTitle>
                      <CardDescription className="text-sm">
                        {getAlertTypeDescription(selectedAlert.type)}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={getSeverityColor(selectedAlert.severity)} className="text-sm">
                    {selectedAlert.severity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Category:</span>
                      <Badge variant="outline">{selectedAlert.category}</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Database className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Plan:</span>
                      <span className="text-sm">{selectedAlert.planName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Server className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Resource:</span>
                      <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                        {selectedAlert.resourceName}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Created:</span>
                      <span className="text-sm">{formatDateTime(selectedAlert.createdDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Assigned to:</span>
                      <span className="text-sm">{mockDetails.assignedTo}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Info className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Status:</span>
                      <Badge variant={mockDetails.status === 'Open' ? 'destructive' : 'default'}>
                        {mockDetails.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Impact Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <span>Impact Analysis</span>
                </CardTitle>
                <CardDescription>
                  Assessment of alert impact and affected resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{mockDetails.impact}</div>
                    <div className="text-sm text-muted-foreground">Impact Level</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{mockDetails.affectedUsers}</div>
                    <div className="text-sm text-muted-foreground">Affected Users</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{mockDetails.estimatedResolution}</div>
                    <div className="text-sm text-muted-foreground">Est. Resolution</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alert Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span>Alert Timeline</span>
                </CardTitle>
                <CardDescription>
                  Chronological view of alert occurrences and activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">First Occurrence</div>
                    <div className="text-sm">{formatDateTime(mockDetails.firstOccurrence)}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Last Occurrence</div>
                    <div className="text-sm">{formatDateTime(mockDetails.lastOccurrence)}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Total Occurrences</div>
                    <div className="text-sm font-bold">{mockDetails.occurrenceCount}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resolution Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Resolution Progress</span>
                </CardTitle>
                <CardDescription>
                  Current status and steps taken to resolve this alert
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resolutionSteps.map((step) => (
                    <div key={step.step} className="flex items-start space-x-4">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                        step.status === 'completed' ? 'bg-green-100 border-green-500' :
                        step.status === 'in-progress' ? 'bg-yellow-100 border-yellow-500' :
                        'bg-gray-100 border-gray-300'
                      }`}>
                        {step.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : step.status === 'in-progress' ? (
                          <Clock className="w-4 h-4 text-yellow-500" />
                        ) : (
                          <div className="w-2 h-2 bg-gray-400 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">{step.title}</h4>
                          {step.timestamp && (
                            <span className="text-xs text-muted-foreground">{step.timestamp}</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ExternalLink className="w-5 h-5 text-purple-500" />
                  <span>Related Alerts</span>
                </CardTitle>
                <CardDescription>
                  Other alerts that may be related to this issue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {relatedAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge variant={getSeverityColor(alert.severity as any)} className="text-xs">
                          {alert.severity}
                        </Badge>
                        <span className="text-sm font-medium">{alert.type}</span>
                        <span className="text-sm text-muted-foreground">{alert.resource}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technical Details */}
            {selectedAlert.rawPayload && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <span>Technical Details</span>
                  </CardTitle>
                  <CardDescription>
                    Raw alert data and technical information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Alert ID</TableCell>
                        <TableCell className="font-mono text-sm">{selectedAlert.id}</TableCell>
                      </TableRow>
                      {selectedAlert.planId && (
                        <TableRow>
                          <TableCell className="font-medium">Plan ID</TableCell>
                          <TableCell className="font-mono text-sm">{selectedAlert.planId}</TableCell>
                        </TableRow>
                      )}
                      {selectedAlert.agentId && (
                        <TableRow>
                          <TableCell className="font-medium">Agent ID</TableCell>
                          <TableCell className="font-mono text-sm">{selectedAlert.agentId}</TableCell>
                        </TableRow>
                      )}
                      {selectedAlert.resourceId && (
                        <TableRow>
                          <TableCell className="font-medium">Resource ID</TableCell>
                          <TableCell className="font-mono text-sm">{selectedAlert.resourceId}</TableCell>
                        </TableRow>
                      )}
                      {selectedAlert.backupSource && (
                        <TableRow>
                          <TableCell className="font-medium">Backup Source</TableCell>
                          <TableCell className="font-mono text-sm">{selectedAlert.backupSource}</TableCell>
                        </TableRow>
                      )}
                      {selectedAlert.backupLocation && (
                        <TableRow>
                          <TableCell className="font-medium">Backup Location</TableCell>
                          <TableCell className="font-mono text-sm">{selectedAlert.backupLocation}</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div>
                    <h3 className="font-semibold">Quick Actions</h3>
                    <p className="text-sm text-muted-foreground">
                      Common actions for managing this alert
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm">
                      <User className="w-4 h-4 mr-2" />
                      Reassign
                    </Button>
                    <Button variant="outline" size="sm">
                      <Clock className="w-4 h-4 mr-2" />
                      Snooze
                    </Button>
                    <Button size="sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Resolved
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}