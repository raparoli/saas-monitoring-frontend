import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../../../shared/components/ui/sheet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { Badge } from '../../../shared/components/ui/badge';
import { Progress } from '../../../shared/components/ui/progress';
import { Separator } from '../../../shared/components/ui/separator';
import { ScrollArea } from '../../../shared/components/ui/scroll-area';
import { 
  Users, 
  HardDrive, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  Shield,
  Clock,
  Building
} from 'lucide-react';
import { Customer } from '../types';
import { formatStorageGB, formatDate, getUtilizationColor } from '../utils';

interface CustomerDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCustomer: Customer | null;
}

export function CustomerDetailDrawer({ isOpen, onClose, selectedCustomer }: CustomerDetailDrawerProps) {
  if (!selectedCustomer) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <Building className="w-5 h-5" />
            <span>{selectedCustomer.name}</span>
          </SheetTitle>
          <SheetDescription>
            Detailed customer information and usage metrics
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Customer ID</p>
                    <p className="font-mono text-sm">{selectedCustomer.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Type</p>
                    <Badge variant="outline">{selectedCustomer.type}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pricing Mode</p>
                    <p className="text-sm">{selectedCustomer.pricing_mode}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Language</p>
                    <p className="text-sm">{selectedCustomer.language.toUpperCase()}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedCustomer.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedCustomer.contact_email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedCustomer.contact_phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Protected Workloads</p>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-lg font-semibold">{selectedCustomer.total_protected_workloads}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Local Storage</p>
                    <div className="flex items-center space-x-2">
                      <HardDrive className="w-4 h-4 text-muted-foreground" />
                      <span className="text-lg font-semibold">{formatStorageGB(selectedCustomer.local_storageInGB)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-muted-foreground">Utilization Rate</p>
                    <span className={`text-sm font-medium ${getUtilizationColor(selectedCustomer.utilization_rate || 0)}`}>
                      {selectedCustomer.utilization_rate || 0}%
                    </span>
                  </div>
                  <Progress value={selectedCustomer.utilization_rate || 0} className="h-3" />
                </div>

                <Separator />

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Servers</p>
                    <p className="text-lg font-semibold">{selectedCustomer.servers || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">VMs</p>
                    <p className="text-lg font-semibold">{selectedCustomer.vms || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Workstations</p>
                    <p className="text-lg font-semibold">{selectedCustomer.workstations || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security & Compliance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Security & Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Multi-Factor Authentication</span>
                  </div>
                  <Badge variant={selectedCustomer.mfa_status === 'enabled' ? 'default' : 'secondary'}>
                    {selectedCustomer.mfa_status === 'enabled' ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Account Status</span>
                  </div>
                  <Badge variant={selectedCustomer.enabled ? 'default' : 'secondary'}>
                    {selectedCustomer.enabled ? 'Active' : 'Disabled'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span>{formatDate(selectedCustomer.created_at)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Production Start</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span>{formatDate(selectedCustomer.production_start_date)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span>{formatDate(selectedCustomer.updated_at)}</span>
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