import { Component, computed, effect, inject, signal } from '@angular/core';
import { LeaveStore } from '@core/store/leave.store';
import { Header } from '@shared/components/header/header';
import { Icon } from '@shared/components/icon/icon';
import { colors, days } from '@shared/constants/calendar';
import { CalendarDay, CalendarEvent } from '@shared/models/calendar';
import { LeaveStatus } from '@shared/models/leave';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.html',
  imports: [Header, Icon],
})
export class Calendar {
  private readonly store = inject(LeaveStore);
  private readonly currentDate = signal<Date>(new Date());
  protected readonly leaves = this.store.leaves();
  protected readonly weekDays = days;
  protected readonly calendarDays = signal<CalendarDay[]>(this.generateCalendarDays());

  constructor() {
    effect(() => console.log(this.leaves));
  }

  protected currentMonth(): string {
    return this.currentDate().toLocaleString('default', { month: 'long' });
  }

  protected currentYear(): number {
    return this.currentDate().getFullYear();
  }

  private generateCalendarDays(): CalendarDay[] {
    const year = this.currentDate().getFullYear();
    const month = this.currentDate().getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const firstDayOfWeek = firstDay.getDay();

    const daysFromPreviousMonth = firstDayOfWeek;

    const totalDays = 42;

    const days: CalendarDay[] = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = daysFromPreviousMonth - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        date,
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        events: this.getEventsForDate(date),
      });
    }

    const remainingDays = totalDays - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
      });
    }

    return days;
  }

  protected isDateWithinLeave(
    targetDate: Date,
    startDate: string | Date,
    endDate: string | Date
  ): boolean {
    const start = new Date(startDate);
    const end = new Date(endDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    targetDate.setHours(12, 0, 0, 0);

    const day = targetDate.getDay();
    const isWeekend = day === 0 || day === 6;
    if (isWeekend) return false;

    return targetDate >= start && targetDate <= end;
  }

  private getEventsForDate(date: Date): CalendarEvent[] {
    const events: CalendarEvent[] = [];

    this.leaves.forEach((leave) => {
      if (this.isDateWithinLeave(date, leave.start_date, leave.end_date))
        events.push({ id: leave.id, name: leave.user_username ?? 'Unknown', type: leave.status });
    });

    return events;
  }

  protected previousMonth(): void {
    const newDate = new Date(this.currentDate());
    newDate.setMonth(newDate.getMonth() - 1);
    this.currentDate.set(newDate);
    this.calendarDays.set(this.generateCalendarDays());
  }

  protected nextMonth(): void {
    const newDate = new Date(this.currentDate());
    newDate.setMonth(newDate.getMonth() + 1);
    this.currentDate.set(newDate);
    this.calendarDays.set(this.generateCalendarDays());
  }

  protected getDayClasses(day: CalendarDay): string {
    const baseClasses = 'border border-[#407BFF] ';
    if (!day.isCurrentMonth) {
      return baseClasses + 'bg-background-light text-gray-400 dark:text-gray-600';
    }

    const today = new Date();
    const isToday = day.date.toDateString() === today.toDateString();

    if (isToday) {
      return baseClasses + 'bg-[#407BFF] border-2 border-[#407BFF]';
    }

    return baseClasses + 'bg-white';
  }

  getEventClasses(type: string): string {
    const classes: { [key: string]: string } = {
      pending: 'md:bg-gray-200 md:border-2 border-dashed border-gray-400',
      approved: 'md:bg-green-500/20',
      rejected: 'md:bg-red-500/20',
    };
    return `flex items-center gap-2 p-1 rounded-lg ${classes[type.toLowerCase()] || 'bg-gray-200'}`;
  }

  getEventDotClass(type: string): string {
    const classes: { [key: string]: string } = {
      pending: 'border-2 border-dashed border-gray-400 bg-transparent',
      approved: 'bg-green-500',
      rejected: 'bg-red-500',
    };
    return `${classes[type.toLowerCase()] || 'bg-gray-500'}`;
  }
}
