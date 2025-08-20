import { User } from '../../../shared/types';

class UsersService {
  private async mockDelay(ms: number = 600): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getUsers(): Promise<{ data: User[]; success: boolean; message?: string }> {
    await this.mockDelay(600);
    
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@company.com',
        role: 'Admin',
        status: 'Active',
        lastActive: '2024-01-15T14:30:00Z',
        createdOn: '2024-06-15T09:00:00Z',
        assignedProducts: ['Acronis', 'Microsoft', 'Bitdefender'],
        avatar: undefined
      },
      {
        id: '2',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com',
        role: 'Analyst',
        status: 'Active',
        lastActive: '2024-01-15T12:45:00Z',
        createdOn: '2024-08-22T10:30:00Z',
        assignedProducts: ['Acronis', 'Microsoft'],
        avatar: undefined
      },
      {
        id: '3',
        name: 'Michael Chen',
        email: 'michael.chen@company.com',
        role: 'Viewer',
        status: 'Active',
        lastActive: '2024-01-14T16:20:00Z',
        createdOn: '2024-11-10T14:15:00Z',
        assignedProducts: ['Acronis'],
        avatar: undefined
      },
      {
        id: '4',
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@company.com',
        role: 'Analyst',
        status: 'Suspended',
        lastActive: '2024-01-10T11:30:00Z',
        createdOn: '2024-09-05T13:45:00Z',
        assignedProducts: ['Microsoft', 'Bitdefender'],
        avatar: undefined
      },
      {
        id: '5',
        name: 'David Thompson',
        email: 'david.thompson@company.com',
        role: 'Viewer',
        status: 'Active',
        lastActive: '2024-01-15T08:15:00Z',
        createdOn: '2024-12-01T16:00:00Z',
        assignedProducts: ['Bitdefender'],
        avatar: undefined
      }
    ];
    
    return {
      success: true,
      data: mockUsers
    };
  }
}

export const usersService = new UsersService();