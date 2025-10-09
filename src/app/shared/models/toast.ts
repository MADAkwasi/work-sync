export interface Toast {
  title: string;
  message?: string;
  type: ToastType;
  id: number;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';
