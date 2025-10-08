export const endpoints = {
  pages: {
    loginPage: '/login',
    requestLeave: '/employee/request-leave',
    employeeDashboard: '/employee',
    adminDashboard: '/admin',
  },
  auth: {
    login: 'auth/login',
    register: 'auth/register',
    logout: 'auth/apiKey/revoke',
  },
  leave: {
    getLeave: 'leaves/mine',
    handleLeave: 'leaves',
    handleLeaveRequest: (id: number, action: 'approve' | 'reject') => `leaves/${id}/${action}`,
  },
};
