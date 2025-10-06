import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leaveDuration',
  standalone: true,
})
export class LeaveDurationPipe implements PipeTransform {
  transform(startDate: string | Date | null, endDate: string | Date | null): number {
    if (!startDate || !endDate) return 0;

    const start = this.normalizeDate(startDate);
    const end = this.normalizeDate(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
    if (end < start) return 0;

    let workingDays = 0;
    const current = new Date(start);

    while (current <= end) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) {
        workingDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    return workingDays;
  }

  private normalizeDate(date: string | Date): Date {
    if (date instanceof Date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    const parts = date.split('-').map(Number);
    if (parts.length === 3) {
      return new Date(parts[0], parts[1] - 1, parts[2]);
    }

    const parsed = new Date(date);
    return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
  }
}
