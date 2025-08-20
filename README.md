# SaaS Monitoring Platform

A comprehensive SaaS monitoring and management platform built with React, TypeScript, and Tailwind CSS.

## Features

- **Dashboard Overview**: Real-time monitoring of integrated SaaS products
- **Product Marketplace**: Discover and integrate new SaaS products
- **License Management**: Track license utilization and renewals
- **Alert Management**: Monitor and manage email alerts across products
- **User Management**: Manage user accounts and permissions
- **Acronis Integration**: Detailed monitoring for Acronis Cyber Protect

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── layout/          # Layout components
│   ├── pages/           # Page components
│   └── modals/          # Modal components
├── constants/           # Application constants
├── data/               # Mock data and static data
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Code Organization

The codebase follows a modular architecture with clear separation of concerns:

- **Types**: Centralized in `src/types/index.ts`
- **Constants**: Product data, navigation items, and configuration
- **Utils**: Formatting, styling, and helper functions
- **Hooks**: Custom hooks for state management
- **Components**: Organized by purpose (common, layout, pages, modals)

## Key Components

- **App.tsx**: Main application component with routing logic
- **DashboardLayout**: Sidebar navigation and top bar
- **Common Components**: Reusable components like PageHeader, StatCard, SearchAndFilter
- **Page Components**: Individual page implementations
- **Acronis Components**: Specialized components for Acronis integration

## Development Guidelines

- Use TypeScript for type safety
- Follow the established component structure
- Utilize utility functions for consistent formatting
- Maintain separation of concerns
- Keep components focused and reusable

## License

MIT License - see LICENSE file for details