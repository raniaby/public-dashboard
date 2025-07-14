# Public Dashboard

A full-stack dashboard application featuring a React frontend and NestJS backend with Keycloak authentication.

## Features

- 🔐 **Secure Authentication**: Integrated with Keycloak for robust user authentication and authorization
- 📊 **Interactive Dashboard**: Visualizations for posts and todos data
- 👥 **User Management**: User table with search and filtering capabilities
- 🎨 **Modern UI**: Built with React, Tailwind CSS, and modern design principles
- 🔄 **Real-time Updates**: Dynamic data fetching and state management
- 📱 **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Frontend

- React with TypeScript
- Redux Toolkit query
- Tailwind CSS for styling
- Vite as build tool
- Chart.js for data visualization

### Backend

- NestJS framework
- TypeScript
- Docker for containerization
- Keycloak for authentication

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd public-dashboard
```

### 2. Backend Setup

````bash
cd backend

# Start Docker containers (Keycloak and PostgreSQL)
npm run setup:server:prod


The backend server will be available at `http://localhost:5001`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
````

The frontend application will be available at `http://localhost:5173`

## Environment Configuration

### Backend

Create a `.env` file in the `backend` directory:

```env
PORT=3000
NODE_ENV=development
KEYCLOAK_AUTH_SERVER_URL=http://localhost:8077
KEYCLOAK_CLIENT_ID=your-client-id
KEYCLOAK_SECRET=your-secret
```

### Frontend

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:3000
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_CLIENT_ID=your-client-id
```

## Project Structure

```
public-dashboard/
├── backend/                 # NestJS backend application
│   ├── src/
│   │   ├── modules/        # Feature modules (auth, users, posts, todos)
│   │   ├── shared/         # Shared services and utilities
│   │   └── conf/           # Configuration files
│   └── docker/             # Docker configuration files
└── frontend/               # React frontend application
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/         # Page components
    │   ├── store/         # Redux store configuration
    │   └── hooks/         # Custom React hooks
    └── public/            # Static assets
```

## Available Scripts

### Backend

- `npm run server:node` - Start the development server
- `npm run build` - Build the application
- `npm run start:prod` - Start the production server
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

### Frontend

- `npm run dev` - Start the development server
- `npm run build` - Build the application
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint
