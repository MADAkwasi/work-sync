import { LeaveStatus } from './leave';

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  events?: CalendarEvent[];
}

export interface CalendarEvent {
  id: number;
  name: string;
  type: LeaveStatus;
}
