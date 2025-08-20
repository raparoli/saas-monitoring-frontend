import React, { useState, useMemo } from 'react';
import { MOCK_USERS, AVAILABLE_PRODUCTS } from '../src/data/mockUserData';
import { User } from '../src/types';
import { getRoleBadgeColor } from '../src/utils/badge-variants';
import { getInitials, formatDate, formatDateTime } from '../src/utils/formatters';
import { SearchAndFilter } from '../src/components/common/SearchAndFilter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Users,
  Edit,
  Trash2,
} from 'lucide-react';

interface InviteUserForm {
  email: string;
  role: 'Admin' | 'Analyst' | 'Viewer';
  assignedProducts: string[];
}

export function UserManagementPage() {
  // State management
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
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
      <SearchAndFilter
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search by name or email..."
        filters={[
          {
            value: roleFilter,
            onChange: setRoleFilter,
            placeholder: "Role",
            options: [
              { value: 'All', label: 'All Roles' },
              { value: 'Admin', label: 'Admin' },
              { value: 'Analyst', label: 'Analyst' },
              { value: 'Viewer', label: 'Viewer' }
            ]
          },
          {
            value: statusFilter,
            onChange: setStatusFilter,
            placeholder: "Status",
            options: [
              { value: 'All', label: 'All Status' },
              { value: 'Active', label: 'Active' },
              { value: 'Suspended', label: 'Suspended' }
            ]
          }
        ]}
      />

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