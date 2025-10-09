import { Component, computed, inject, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Header } from '@shared/components/header/header';
import { Table } from '@shared/components/table/table';
import { toastNotifications } from '@shared/constants/toast';
import { finalize } from 'rxjs';
import { Leave, LeaveStatus } from '@shared/models/leave';
import { ToastService } from '@core/services/toast/toast';
import { LeaveService } from '@core/services/leave/leave';
import { LeaveStore } from '@core/store/leave.store';

@Component({
  selector: 'app-dashboard',
  imports: [Header, CardModule, Table],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly store = inject(LeaveStore);
  private readonly leaveService = inject(LeaveService);
  private readonly toast = inject(ToastService);
  protected readonly isFetching = signal(false);
  protected readonly leaves = signal<Leave[]>([]);
  protected readonly pendingRequests = computed(() =>
    this.leaves().filter((leave) => leave.status === LeaveStatus.PENDING)
  );

  ngOnInit(): void {
    this.fetchLeaves();
  }

  protected fetchLeaves(): void {
    const { operations, status } = toastNotifications;
    this.isFetching.set(true);

    this.leaveService
      .getAllLeaves()
      .pipe(finalize(() => this.isFetching.set(false)))
      .subscribe({
        next: (res) => {
          this.leaves.set(res);
          this.store.setLeaves(this.leaves());
        },
        error: ({ error }) => this.toast.show(operations.fetchFailed, status.error, error.message),
      });
  }

  protected countLeavesByPeriod(period: 'day' | 'week' | 'month'): number {
    const now = new Date();
    const leaves = this.leaves();

    return leaves.filter((leave) => {
      const start = new Date(leave.start_date);
      const end = new Date(leave.end_date);

      switch (period) {
        case 'day': {
          return (
            leave.status === LeaveStatus.APPROVED && start.toDateString() === now.toDateString()
          );
        }

        case 'week': {
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay());
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          return (
            leave.status === LeaveStatus.APPROVED && start >= startOfWeek && start <= endOfWeek
          );
        }

        case 'month': {
          return (
            leave.status === LeaveStatus.APPROVED &&
            start.getMonth() === now.getMonth() &&
            start.getFullYear() === now.getFullYear()
          );
        }

        default:
          return false;
      }
    }).length;
  }
}
