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
- **Leave Type Indicators** - Different colors for vacation, sick leave, personal time
- **Status Tracking** - Visual indicators for pending, approved, rejected requests
- **Date Range Display** - Clear visibility of leave durations

### 🎨 UI/UX

- **Modern Design** - Clean, professional interface
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode** - Built-in theme support
- **Intuitive Navigation** - Easy-to-use interface

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Angular CLI
- Modern web browser

### Installation

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd leave-management-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   ```bash
   # Update src/environments/environment.ts with your backend API URL
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
4. **Check calendar** to see team availability

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
- **Deployment**: Netlify/Vercel
- **Icons**: Material Symbols

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
- ✅ **Dark Mode Support** - Built-in theme switching

## 📁 Project Structure

```
src/
├── app/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Main application pages
│   ├── services/       # API services and business logic
│   ├── guards/         # Route protection
│   ├── interfaces/     # TypeScript interfaces
│   └── utils/          # Helper functions
├── assets/            # Static assets
└── environments/      # Environment configurations
```

## 🌐 Deployment

The application is deployed on:

- **Frontend**: [Your Hosted URL]
- **Backend**: [Provided Backend API URL]

### Deployment Platforms Supported

- Netlify
- Vercel
- Render
- GitHub Pages

## 📞 Support

For technical support or questions about this project, please contact:

**THE DIGICOAST**  
📞 +44 78 1833 5634 | +233 54 648 4338  
📧 info@thedigicoast.com  
🌐 thedigicoast.com

## 📄 License

This project was developed as part of the Digicoast Graduate Intern Frontend Assessment.

---

**Built with ❤️ for Worksync - Solving the case of vanishing colleagues**
