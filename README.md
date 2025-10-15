# Leave Management System

A modern, responsive Leave Management System built with Angular that helps teams track employee time off and prevent scheduling conflicts.

## 🌟 Features

### 🔐 Authentication & Security

- **User Registration & Login** - Secure account creation and authentication
- **JWT Token Management** - Automatic token handling for all requests
- **API Key Validation** - Every request includes required security headers
- **Role-based Access Control** - Different permissions for normal users and admins

### 👤 User Features

- **View Personal Leave Requests** - See your own leave history and status
- **Create New Leave Requests** - Submit vacation, sick leave, or personal time off
- **Real-time Status Updates** - Track pending, approved, or rejected requests

### 👨‍💼 Admin Features

- **Dashboard Overview** - View all team leave requests
- **Approve/Reject Requests** - Manage employee time off approvals
- **Team Calendar** - Comprehensive view of all employee absences

### 📅 Calendar Magic

- **Visual Leave Calendar** - Color-coded calendar view showing employee absences
- **Employee Information** - See who is away and when
- **Status Tracking** - Visual indicators for pending, approved, rejected requests
- **Date Range Display** - Clear visibility of leave durations

### 🎨 UI/UX

- **Modern Design** - Clean, professional interface
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- **Intuitive Navigation** - Easy-to-use interface

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Angular CLI
- Modern web browser

### Installation

1. **Clone the repository**

   ```bash
   git clone [https://github.com/MADAkwasi/work-sync.git]
   cd work-sync
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment**

   ```bash
   # Update src/app/core/environments/environment.ts with your backend API URL
   export const environment = {
     production: false,
     apiUrl: 'YOUR_BACKEND_API_URL'
   };
   ```

4. **Start development server**
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200`

### Building for Production

```bash
ng build --prod
```

## 📱 Usage

### For Employees

1. **Register/Login** to your account
2. **View your dashboard** to see current leave requests
3. **Create new requests** for time off

### For Managers/Admins

1. **Login with admin credentials**
2. **Access admin dashboard** to view all requests
3. **Approve or reject** pending leave requests
4. **Monitor team calendar** for scheduling conflicts

## 🛠️ Technical Stack

- **Frontend Framework**: Angular
- **Styling**: Tailwind CSS
- **Authentication**: JWT Tokens
- **State Management**: Angular Signals
- **Deployment**: Netlify
- **Icons & UI Library**: PrimeNg

## 🔒 Security Features

- JWT Token authentication
- API key validation on all requests
- Route guards for protected routes
- Automatic token refresh
- Secure localStorage/sessionStorage handling

## 🎯 Bonus Features Implemented

- ✅ **Role-based routing** - Normal users cannot access admin dashboard
- ✅ **Search & Filter** - Filter calendar by person or leave type
- ✅ **Responsive Design** - Modern, mobile-friendly UI
- ✅ **Color-coded Calendar** - Visual indicators for different leave types and statuses

## 📁 Project Structure

```
src/
└── app/
    ├── core/
    │   ├── environments/     # Holds environment-specific configurations (e.g., dev, prod)
    │   ├── guards/           # Route guards that control access to specific pages or features
    │   ├── interceptors/     # HTTP interceptors for handling requests, responses, or errors globally
    │   ├── pipes/            # Global pipes used across multiple features
    │   ├── services/         # Core singleton services for API calls or app-wide logic
    │   └── store/            # Global state management
    │
    ├── features/
    │   ├── admin/
    │   │   └── pages/        # Admin-facing pages (e.g., dashboard, calendar view)
    │   │   └── components/   # Reusable admin-specific UI components (optional)
    │   │
    │   └── employee/
    │       └── pages/        # Employee-facing pages (e.g., dashboard, request page)
    │       └── components/   # Reusable employee-specific UI components (optional)
    │
    └── shared/
         ├── components/      # Reusable UI components shared across features (e.g., modals, inputs)
         ├── constants/       # Application-wide constants and enums
         ├── models/          # TypeScript interfaces and type definitions
         ├── pages/           # Shared standalone pages (e.g., 404, login)
         └── validators/      # Custom form validators and validation logic
```

## 🌐 Deployment

The application is deployed on:

- [https://the-work-sync.netlify.app]

### Deployment Platforms Supported

- Netlify
- Vercel
- Render
- GitHub Pages
