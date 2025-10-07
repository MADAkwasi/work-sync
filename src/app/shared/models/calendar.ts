export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  events?: CalendarEvent[];
}

export interface CalendarEvent {
  name: string;
  type: 'vacation' | 'sick' | 'personal' | 'pending' | 'approved' | 'rejected';
}
