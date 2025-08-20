import React from 'react';
import { Badge } from '../ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';
import { Separator } from '../ui/separator';
import {
  Database,
  Server,
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import { Customer } from './types';
import { formatStorageGB, formatDate } from './utils';

interface CustomerDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCustomer: Customer | null;
}

export function CustomerDetailDrawer({
  isOpen,
  onClose,
  selectedCustomer
}: CustomerDetailDrawerProps) {
  if (!selectedCustomer) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{selectedCustomer.name}</SheetTitle>
          <SheetDescription>
            Detailed customer information and account settings
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Status and Tags */}
          <div className="space-y-3">
            <h4 className="font-medium">Status & Type</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant={selectedCustomer.enabled ? 'default' : 'secondary'}>
                {selectedCustomer.enabled ? 'Enabled' : 'Disabled'}
              </Badge>
              <Badge variant="outline">{selectedCustomer.type}</Badge>
              <Badge variant="outline">{selectedCustomer.pricing_mode}</Badge>
              <Badge variant={selectedCustomer.mfa_status === 'enabled' ? 'default' : 'destructive'}>
                MFA: {selectedCustomer.mfa_status}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Storage & Workloads */}
          <div className="space-y-3">
            <h4 className="font-medium">Usage Statistics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/20 rounded-lg">
                <Database className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium">{formatStorageGB(selectedCustomer.local_storageInGB)}</p>
                <p className="text-xs text-muted-foreground">Local Storage</p>
              </div>
              <div className="text-center p-3 bg-muted/20 rounded-lg">
                <Server className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium">{selectedCustomer.total_protected_workloads}</p>
                <p className="text-xs text-muted-foreground">Protected Workloads</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="font-medium">Contact Information</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{selectedCustomer.contact_email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{selectedCustomer.contact_phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{selectedCustomer.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span>{selectedCustomer.language.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Technical Details */}
          <div className="space-y-3">
            <h4 className="font-medium">Technical Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Brand UUID</span>
                <span className="font-mono text-xs">{selectedCustomer.brand_uuid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Owner ID</span>
                <span className="font-mono text-xs">{selectedCustomer.owner_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{formatDate(selectedCustomer.created_at)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>{formatDate(selectedCustomer.updated_at)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Production Start</span>
                <span>{formatDate(selectedCustomer.production_start_date)}</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}