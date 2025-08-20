import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Loader2,
  Key,
  Shield,
  Info,
  HardDrive,
  Cloud
} from 'lucide-react';
import { IntegrationProduct, IntegrationStep } from '../../types';
import { INTEGRATION_REQUIREMENTS } from '../../constants';
import { getProductIcon } from '../../lib/icons';

interface IntegrationWindowProps {
  product: IntegrationProduct;
  onClose: () => void;
  onComplete: () => void;
}

export function IntegrationWindow({ product, onClose, onComplete }: IntegrationWindowProps) {
  const [currentStep, setCurrentStep] = useState<IntegrationStep>('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    apiKey: '',
    apiSecret: '',
    serverUrl: '',
    organizationId: '',
    licenseCount: '',
    autoSync: true,
    syncFrequency: '24',
    enableAlerts: true,
    permissions: {
      userManagement: true,
      licenseMonitoring: true,
      usageReporting: true,
      billing: false
    }
  });

  const steps: Array<{ id: IntegrationStep; title: string; description: string }> = [
    { id: 'overview', title: 'Overview', description: 'Integration details' },
    { id: 'credentials', title: 'Credentials', description: 'API authentication' },
    { id: 'configuration', title: 'Configuration', description: 'Setup options' },
    { id: 'permissions', title: 'Permissions', description: 'Access controls' },
    { id: 'testing', title: 'Testing', description: 'Verify connection' },
    { id: 'success', title: 'Complete', description: 'Integration ready' }
  ];

  const getCurrentStepIndex = () => steps.findIndex(step => step.id === currentStep);
  const progress = ((getCurrentStepIndex() + 1) / steps.length) * 100;

  const handleNext = async () => {
    const stepIndex = getCurrentStepIndex();
    
    if (currentStep === 'testing') {
      setIsLoading(true);
      // Simulate API testing
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsLoading(false);
      setCurrentStep('success');
    } else if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].id);
    }
  };

  const handleBack = () => {
    const stepIndex = getCurrentStepIndex();
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].id);
    }
  };

  const handleComplete = () => {
    onComplete();
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updatePermissions = (permission: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: value
      }
    }));
  };

  const Icon = getProductIcon(product.name);
  const requirements = INTEGRATION_REQUIREMENTS[product.id as keyof typeof INTEGRATION_REQUIREMENTS] || {
    credentials: ['API Key'],
    permissions: ['Basic access'],
    requirements: ['Active account']
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-muted-foreground">{product.category}</p>
                <Badge variant="secondary" className="mt-1">Ready to integrate</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">What you'll need:</h4>
                <ul className="space-y-1">
                  {requirements.credentials.map((cred, index) => (
                    <li key={index} className="flex items-center text-sm text-muted-foreground">
                      <Key className="w-4 h-4 mr-2" />
                      {cred}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Required permissions:</h4>
                <ul className="space-y-1">
                  {requirements.permissions.map((permission, index) => (
                    <li key={index} className="flex items-center text-sm text-muted-foreground">
                      <Shield className="w-4 h-4 mr-2" />
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Prerequisites:</h4>
                <ul className="space-y-1">
                  {requirements.requirements.map((req, index) => (
                    <li key={index} className="flex items-center text-sm text-muted-foreground">
                      <Info className="w-4 h-4 mr-2" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800">
                      This integration will sync data every {formData.syncFrequency} hours and provide 
                      real-time monitoring of your {product.name} licenses and usage.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'credentials':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">API Credentials</h3>
              <p className="text-muted-foreground">
                Enter your {product.name} API credentials to establish the connection.
              </p>
            </div>

            <div className="space-y-4">
              {product.id === 'microsoft' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">Application ID</Label>
                    <Input
                      id="apiKey"
                      placeholder="Enter your Azure Application ID"
                      value={formData.apiKey}
                      onChange={(e) => updateFormData('apiKey', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apiSecret">Client Secret</Label>
                    <Input
                      id="apiSecret"
                      type="password"
                      placeholder="Enter your client secret"
                      value={formData.apiSecret}
                      onChange={(e) => updateFormData('apiSecret', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organizationId">Tenant ID</Label>
                    <Input
                      id="organizationId"
                      placeholder="Enter your Azure Tenant ID"
                      value={formData.organizationId}
                      onChange={(e) => updateFormData('organizationId', e.target.value)}
                    />
                  </div>
                </>
              )}

              {product.id === 'bitdefender' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input
                      id="apiKey"
                      placeholder="Enter your GravityZone API key"
                      value={formData.apiKey}
                      onChange={(e) => updateFormData('apiKey', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organizationId">Company ID</Label>
                    <Input
                      id="organizationId"
                      placeholder="Enter your company ID"
                      value={formData.organizationId}
                      onChange={(e) => updateFormData('organizationId', e.target.value)}
                    />
                  </div>
                </>
              )}

              {product.id === 'acronis' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input
                      id="apiKey"
                      placeholder="Enter your Acronis API key"
                      value={formData.apiKey}
                      onChange={(e) => updateFormData('apiKey', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serverUrl">Server URL</Label>
                    <Input
                      id="serverUrl"
                      placeholder="https://your-server.acronis.com"
                      value={formData.serverUrl}
                      onChange={(e) => updateFormData('serverUrl', e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 'configuration':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Integration Settings</h3>
              <p className="text-muted-foreground">
                Configure how the integration will work with your organization.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="licenseCount">Expected License Count</Label>
                <Input
                  id="licenseCount"
                  type="number"
                  placeholder="Enter number of licenses"
                  value={formData.licenseCount}
                  onChange={(e) => updateFormData('licenseCount', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  This helps us monitor your license utilization
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="syncFrequency">Sync Frequency</Label>
                <Select 
                  value={formData.syncFrequency} 
                  onValueChange={(value) => updateFormData('syncFrequency', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sync frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Every hour</SelectItem>
                    <SelectItem value="6">Every 6 hours</SelectItem>
                    <SelectItem value="12">Every 12 hours</SelectItem>
                    <SelectItem value="24">Daily</SelectItem>
                    <SelectItem value="72">Every 3 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="autoSync" 
                    checked={formData.autoSync}
                    onCheckedChange={(checked) => updateFormData('autoSync', checked)}
                  />
                  <Label htmlFor="autoSync">Enable automatic synchronization</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="enableAlerts" 
                    checked={formData.enableAlerts}
                    onCheckedChange={(checked) => updateFormData('enableAlerts', checked)}
                  />
                  <Label htmlFor="enableAlerts">Enable usage alerts and notifications</Label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'permissions':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Access Permissions</h3>
              <p className="text-muted-foreground">
                Choose what data and actions this integration can access.
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Data Access</CardTitle>
                  <CardDescription>
                    Control what information the integration can read
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="userManagement" 
                      checked={formData.permissions.userManagement}
                      onCheckedChange={(checked) => updatePermissions('userManagement', !!checked)}
                    />
                    <Label htmlFor="userManagement">User management and directory access</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="licenseMonitoring" 
                      checked={formData.permissions.licenseMonitoring}
                      onCheckedChange={(checked) => updatePermissions('licenseMonitoring', !!checked)}
                    />
                    <Label htmlFor="licenseMonitoring">License monitoring and usage tracking</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="usageReporting" 
                      checked={formData.permissions.usageReporting}
                      onCheckedChange={(checked) => updatePermissions('usageReporting', !!checked)}
                    />
                    <Label htmlFor="usageReporting">Usage reporting and analytics</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="billing" 
                      checked={formData.permissions.billing}
                      onCheckedChange={(checked) => updatePermissions('billing', !!checked)}
                    />
                    <Label htmlFor="billing">Billing and cost information</Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'testing':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Testing Connection</h3>
              <p className="text-muted-foreground">
                We're verifying your credentials and testing the integration.
              </p>
            </div>

            {isLoading ? (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <div>
                      <h4 className="font-medium">Connecting to {product.name}...</h4>
                      <p className="text-sm text-muted-foreground">
                        This may take a few moments
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Validating credentials</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Testing API connection</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-4 h-4" />
                      <span>Verifying permissions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Credentials validated successfully</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>API connection established</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Permissions verified</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'success':
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Integration Complete!</h3>
              <p className="text-muted-foreground">
                {product.name} has been successfully integrated with your SaaS monitoring platform.
              </p>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Product:</span>
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Sync Frequency:</span>
                    <span className="font-medium">Every {formData.syncFrequency} hours</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Expected Licenses:</span>
                    <span className="font-medium">{formData.licenseCount || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Alerts Enabled:</span>
                    <span className="font-medium">{formData.enableAlerts ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-sm text-muted-foreground">
              <p>You can view and manage this integration from the Integrated Products page.</p>
              <p>The first sync will begin within the next few minutes.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Integrate {product.name}</DialogTitle>
              <DialogDescription>
                Step {getCurrentStepIndex() + 1} of {steps.length}: {steps[getCurrentStepIndex()].description}
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            {steps.map((step, index) => (
              <span 
                key={step.id} 
                className={index <= getCurrentStepIndex() ? 'text-primary' : ''}
              >
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="py-4">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={currentStep === 'overview' || isLoading}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>

          {currentStep === 'success' ? (
            <Button onClick={handleComplete}>
              Complete Integration
            </Button>
          ) : (
            <Button 
              onClick={handleNext}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}