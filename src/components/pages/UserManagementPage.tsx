import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Users,
  Edit,
  Trash2,
  UserPlus,
  Search,
  Filter,
  RefreshCw
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Analyst' | 'Viewer';
  status: 'Active' | 'Suspended';
  lastActive: string;
  createdOn: string;
  assignedProducts: string[];
  avatar?: string;
}

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Admin',
    status: 'Active',
    lastActive: '2024-01-15T14:30:00Z',
    createdOn: '2023-06-15T09:00:00Z',
    assignedProducts: ['Acronis', 'Microsoft', 'Bitdefender']
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'Analyst',
    status: 'Active',
    lastActive: '2024-01-15T12:45:00Z',
    createdOn: '2023-08-22T10:30:00Z',
    assignedProducts: ['Acronis', 'Microsoft']
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'Viewer',
    status: 'Active',
    lastActive: '2024-01-14T16:20:00Z',
    createdOn: '2023-11-10T14:15:00Z',
    assignedProducts: ['Acronis']
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    role: 'Analyst',
    status: 'Suspended',
    lastActive: '2024-01-10T11:30:00Z',
    createdOn: '2023-09-05T13:45:00Z',
    assignedProducts: ['Microsoft', 'Bitdefender']
  },
  {
    id: '5',
    name: 'David Thompson',
    email: 'david.thompson@company.com',
    role: 'Viewer',
    status: 'Active',
    lastActive: '2024-01-15T08:15:00Z',
    createdOn: '2023-12-01T16:00:00Z',
    assignedProducts: ['Bitdefender']
  }
];

export function UserManagementPage() {
  // State management
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Analyst': return 'bg-blue-100 text-blue-800';
      case 'Viewer': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = roleFilter === 'All' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'All' || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setRoleFilter('All');
    setStatusFilter('All');
  };

  return (
    <div className="flex-1 p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500">
            Manage accounts, roles and product assignments
          </p>
        </div>
        <Button
          variant="default"
          className="bg-gray-900 text-white hover:bg-gray-800"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Invite
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter Controls</span>
          </CardTitle>
          <CardDescription>
            Filter and search through data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white shadow-sm"
                />
              </div>
              
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-white shadow-sm">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Analyst">Analyst</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-white shadow-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleResetFilters}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border bg-white">
        <CardHeader>
          <CardTitle className="text-base font-medium">
            Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-500">Name</TableHead>
                <TableHead className="text-gray-500">Email</TableHead>
                <TableHead className="text-gray-500">Role</TableHead>
                <TableHead className="text-gray-500">Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={u.avatar} />
                        <AvatarFallback className="bg-gray-200 text-gray-700 text-sm">
                          {getInitials(u.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{u.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {u.email}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getRoleBadgeColor(u.role)}>
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        u.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }
                    >
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}