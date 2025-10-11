import { ToastType } from '@shared/models/toast';

export const toastNotifications = {
  status: {
    error: 'error',
    success: 'success',
    info: 'info',
    warning: 'warning',
  } satisfies Record<string, ToastType>,
  operations: {
    loginFailed: 'Login Failed',
    fetchFailed: 'Failed to fetch leaves',
    updateRequest: 'Leave request updated successfully',
    submitRequest: 'Leave request submitted successfully',
    actionFailed: 'Action failed',
    createSuccess: 'Leave request created successfully',
    userSuccess: 'User created successfully',
    userFailed: 'Failed to create user',
    registrationFailed: 'Registration Failed',
    accessDenied: 'Login to view resource',
  },
  messages: {
    cantView: 'Login to view resource',
  },
};
