export interface Leave {
  id: number;
  user_id: number;
  employee_name?: string;
  reason: string;
  start_date: string;
  end_date: string;
  status: LeaveStatus;
  rejection_reason: string | null;
}

export enum LeaveStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  CANCELLED = 'Cancelled',
}
