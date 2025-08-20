import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../shared/components/ui/card';
import { Badge } from '../../shared/components/ui/badge';
import { Progress } from '../../shared/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../shared/components/ui/tooltip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../shared/components/ui/table';
import { Separator } from '../../shared/components/ui/separator';
import {
  PackageCheck,
  Activity,
  Zap,
  CreditCard,
  Calendar as CalendarIcon,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { licenseData, licenseEditions } from './constants';
import { getDaysUntilRenewal, getUtilizationColor, getUtilizationBarColor } from './utils';

export function LicenseSummaryTab() {
  return (
    <div className="space-y-6 mt-0">
      <div>
        <h3 className="text-lg font-semibold">License Summary</h3>
        <p className="text-muted-foreground">Comprehensive license allocation, utilization and contract management</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Licenses</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
              <PackageCheck className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{licenseData.totalLicenses}</div>
            <p className="text-xs text-muted-foreground mt-1">Provisioned</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Used Licenses</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg">
              <Activity className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{licenseData.usedLicenses}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently Assigned</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Licenses</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
              <Zap className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{licenseData.availableLicenses}</div>
            <p className="text-xs text-muted-foreground mt-1">Available</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Overall License Utilization</h4>
                <p className="text-sm text-muted-foreground">
                  {licenseData.usedLicenses} / {licenseData.totalLicenses} licenses in use
                </p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge 
                    variant={licenseData.utilizationPercentage >= 95 ? 'destructive' : 'secondary'}
                    className="cursor-help"
                  >
                    {licenseData.utilizationPercentage}% Utilized
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>High utilization. Consider increasing quota.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <Progress 
                value={licenseData.utilizationPercentage} 
                className="h-4"
              />
              <div 
                className={`absolute left-0 top-0 h-4 rounded-full transition-all duration-300 ${getUtilizationBarColor(licenseData.utilizationPercentage)}`}
                style={{ width: `${licenseData.utilizationPercentage}%` }}
              />
            </div>
            {licenseData.utilizationPercentage >= 90 && (
              <div className="flex items-center space-x-2 text-sm text-destructive">
                <AlertTriangle className="w-4 h-4" />
                <span>High utilization detected — consider purchasing additional licenses</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Edition-wise License Details</CardTitle>
            <CardDescription>Detailed breakdown of license usage by edition and type</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Edition Name</TableHead>
                  <TableHead>License Type</TableHead>
                  <TableHead>Total Quota</TableHead>
                  <TableHead>Used Licenses</TableHead>
                  <TableHead>Utilization Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {licenseEditions.map((edition) => (
                  <TableRow key={edition.id} className="hover:bg-muted/20">
                    <TableCell className="font-medium">{edition.editionName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{edition.licenseType}</Badge>
                    </TableCell>
                    <TableCell>{edition.totalQuota}</TableCell>
                    <TableCell>{edition.usedLicenses}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1">
                          <div className="relative">
                            <Progress value={edition.utilizationRate} className="h-2" />
                            <div 
                              className={`absolute left-0 top-0 h-2 rounded-full transition-all duration-300 ${getUtilizationBarColor(edition.utilizationRate)}`}
                              style={{ width: `${edition.utilizationRate}%` }}
                            />
                          </div>
                        </div>
                        <span className={`text-sm font-medium min-w-12 ${getUtilizationColor(edition.utilizationRate)}`}>
                          {Math.round(edition.utilizationRate)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Contract & Renewal Info</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">License Edition</span>
                <span className="font-medium">{licenseData.licenseType}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Contract Type</span>
                <Badge variant="outline">{licenseData.contractType}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Renewal Date</span>
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="w-3 h-3 text-muted-foreground" />
                  <span className="font-medium">
                    {new Date(licenseData.renewalDate).toLocaleDateString('en-GB')}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Renewal Status</span>
                <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">
                  {licenseData.status}
                </Badge>
              </div>
              {licenseData.contractId && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Contract ID</span>
                  <span className="font-mono text-xs">{licenseData.contractId}</span>
                </div>
              )}
            </div>

            <Separator />

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-1">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Days until renewal</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {getDaysUntilRenewal()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-800">
            <AlertTriangle className="h-5 w-5" />
            <span>Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-orange-700">
            <p className="text-sm">
              Your current license usage is near capacity at <span className="font-medium">{licenseData.utilizationPercentage}%</span>. 
              You may run out of licenses if workload increases.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                High Risk
              </Badge>
              <span className="text-xs text-orange-600">
                Consider purchasing additional licenses or optimizing current usage
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}