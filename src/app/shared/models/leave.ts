export interface Leave {
  id: number;
  user_id: number;
  user_username?: string;
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

export interface LeaveRequest {
  reason: string;
  startDate: string;
  endDate: string;
}
