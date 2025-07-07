# Financial Calculator Application

## Overview

This is a full-stack financial calculator application built with React, Express.js, and TypeScript. The application helps users calculate the opportunity cost of their daily spending habits by showing how much money they could have if they invested those expenses instead. It features a modern UI built with shadcn/ui components and Tailwind CSS.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Bundler**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: React hooks with TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Storage**: In-memory storage for development with database interface abstraction

### Build System
- **Development**: Vite dev server with HMR
- **Production**: Vite build + esbuild for server bundling
- **Type Checking**: TypeScript with strict mode enabled

## Key Components

### Frontend Components
- **Calculator Page**: Main interface for habit selection and calculation
- **Habit Tiles**: Interactive components for selecting spending habits
- **Results Section**: Displays financial calculations with charts
- **Range Sliders**: Custom input components for time horizon and return rate
- **UI Components**: Comprehensive set of shadcn/ui components

### Backend Components
- **Storage Interface**: Abstracted storage layer supporting both memory and database
- **Routes**: Express.js API routes (currently minimal structure)
- **Database Schema**: Drizzle ORM schema with user management
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

### Shared Components
- **Schema**: Shared TypeScript types and Zod validation schemas
- **Database Models**: User model with insert/select type inference

## Data Flow

1. **User Input**: Users select spending habits and adjust parameters via the calculator interface
2. **Client-side Calculation**: Financial calculations are performed in the browser using compound interest formulas
3. **Results Display**: Calculated results are shown with charts and sharing capabilities
4. **State Management**: TanStack Query manages server state with optimistic updates
5. **Database Operations**: User data can be stored via the abstracted storage interface

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **drizzle-orm**: TypeScript ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI components
- **recharts**: Chart library for data visualization
- **wouter**: Lightweight routing library

### Development Dependencies
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: JavaScript bundler for production
- **tailwindcss**: Utility-first CSS framework

## Deployment Strategy

### Development
- Uses Vite dev server with hot module replacement
- TypeScript compilation in watch mode
- Replit-specific development enhancements

### Production
- **Frontend**: Vite build outputs static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations with `db:push` command
- **Environment**: Requires `DATABASE_URL` environment variable

### Database Setup
- PostgreSQL database with Drizzle ORM
- Migration files in `./migrations` directory
- Schema definition in `shared/schema.ts`
- Session storage using connect-pg-simple

## Changelog

```
Changelog:
- July 07, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```