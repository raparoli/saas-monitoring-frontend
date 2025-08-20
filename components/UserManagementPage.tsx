import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { toast } from 'sonner';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Mail,
  Shield,
  Calendar,
  Clock,
  Save,
  Key,
  AlertTriangle
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

interface InviteUserForm {
  email: string;
  role: 'Admin' | 'Analyst' | 'Viewer';
  assignedProducts: string[];
}

export function UserManagementPage() {
  // Mock user data
  const mockUsers: User[] = [
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

  const availableProducts = ['Acronis', 'Microsoft', 'Bitdefender'];

  // State management
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToRemove, setUserToRemove] = useState<User | null>(null);

  // Modal states
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  // Form states
  const [inviteForm, setInviteForm] = useState<InviteUserForm>({
    email: '',
    role: 'Viewer',
    assignedProducts: []
  });

  const itemsPerPage = 25;

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

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Analyst': return 'bg-blue-100 text-blue-800';
      case 'Viewer': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleInviteUser = () => {
    if (!inviteForm.email) {
      toast.error('Email is required');
      return;
    }

    // Mock invite logic
    const newUser: User = {
      id: Date.now().toString(),
      name: inviteForm.email.split('@')[0],
      email: inviteForm.email,
      role: inviteForm.role,
      status: 'Active',
      lastActive: new Date().toISOString(),
      createdOn: new Date().toISOString(),
      assignedProducts: inviteForm.assignedProducts
    };

    setUsers([...users, newUser]);
    setIsInviteModalOpen(false);
    setInviteForm({
      email: '',
      role: 'Viewer',
      assignedProducts: []
    });
    
    toast.success('Invite sent successfully');
  };

  const handleViewEditUser = (user: User) => {
    setSelectedUser({ ...user });
    setIsUserDrawerOpen(true);
  };

  const handleSaveUser = () => {
    if (!selectedUser) return;

    setUsers(users.map(user => 
      user.id === selectedUser.id ? selectedUser : user
    ));
    
    setIsUserDrawerOpen(false);
    toast.success('User updated successfully');
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' }
        : user
    ));
  };

  const handleRemoveUser = (user: User) => {
    setUserToRemove(user);
    setIsRemoveDialogOpen(true);
  };

  const confirmRemoveUser = () => {
    if (!userToRemove) return;
    
    setUsers(users.filter(user => user.id !== userToRemove.id));
    setIsRemoveDialogOpen(false);
    setUserToRemove(null);
    toast.success('User removed successfully');
  };

  const handleResetPassword = () => {
    toast.success('Password reset email sent');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
      <Card className="border bg-gray-50">
        <CardHeader>
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-white border-gray-200"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="bg-white border-gray-200">
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
              <SelectTrigger className="bg-white border-gray-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="mt-6 border bg-white">
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
                    <Badge variant="outline" className="bg-gray-100">
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
//////////////////////////////////////////////