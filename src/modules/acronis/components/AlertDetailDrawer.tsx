import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../../../shared/components/ui/sheet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { Badge } from '../../../shared/components/ui/badge';
import { Separator } from '../../../shared/components/ui/separator';
import { ScrollArea } from '../../../shared/components/ui/scroll-area';
import { 
  AlertTriangle, 
  Calendar, 
  Server, 
  HardDrive,
  Shield,
  Info,
  Clock,
  FileText
} from 'lucide-react';
import { Alert } from '../types';
import { formatDateTime, getSeverityColor, getSeverityIcon } from '../utils';

interface AlertDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAlert: Alert | null;
}

export function AlertDetailDrawer({ isOpen, onClose, selectedAlert }: AlertDetailDrawerProps) {
  if (!selectedAlert) return null;

  const SeverityIcon = getSeverityIcon(selectedAlert.severity);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <SeverityIcon className="w-5 h-5" />
            <span>Alert Details</span>
          </SheetTitle>
          <SheetDescription>
            Comprehensive information about alert #{selectedAlert.id}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <div className="space-y-6">
            {/* Alert Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Alert Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Alert ID</p>
                    <p className="font-mono text-sm">{selectedAlert.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Type</p>
                    <p className="text-sm">{selectedAlert.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Severity</p>
                    <Badge variant={getSeverityColor(selectedAlert.severity)}>
                      {selectedAlert.severity}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Category</p>
                    <Badge variant="outline">{selectedAlert.category}</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Created: {formatDateTime(selectedAlert.createdDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Server className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Resource: {selectedAlert.resourceName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Plan: {selectedAlert.planName}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alert Message */}
            {selectedAlert.message && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Alert Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <p className="text-sm">{selectedAlert.message}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Technical Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Technical Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedAlert.planId && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Plan ID</span>
                    <span className="font-mono text-sm">{selectedAlert.planId}</span>
                  </div>
                )}
                {selectedAlert.agentId && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Agent ID</span>
                    <span className="font-mono text-sm">{selectedAlert.agentId}</span>
                  </div>
                )}
                {selectedAlert.resourceId && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Resource ID</span>
                    <span className="font-mono text-sm">{selectedAlert.resourceId}</span>
                  </div>
                )}
                {selectedAlert.backupSource && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Backup Source</span>
                    <span className="font-mono text-sm">{selectedAlert.backupSource}</span>
                  </div>
                )}
                {selectedAlert.backupLocation && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Backup Location</span>
                    <span className="font-mono text-sm">{selectedAlert.backupLocation}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Raw Payload */}
            {selectedAlert.rawPayload && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Raw Payload</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <pre className="text-xs overflow-x-auto">
                      {JSON.stringify(selectedAlert.rawPayload, null, 2)}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}