export interface EmployeeLeave {
  id: number;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  status: Status;
  reason: string;
  daysRequested: number;
  approver: string;
  appliedOn: string;
}

export enum LeaveType {
  ANNUAL = 'Annual',
  SICK = 'Sick',
  CASUAL = 'Casual',
  MATERNITY = 'Maternity',
  PATERNITY = 'Paternity',
  STUDY = 'Study',
}

export enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}
