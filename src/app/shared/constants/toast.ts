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
  },
};
