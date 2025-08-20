import { User } from '../types';

export const MOCK_USERS: User[] = [
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

export const AVAILABLE_PRODUCTS = ['Acronis', 'Microsoft', 'Bitdefender'];