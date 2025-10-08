import { Component, computed, inject, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Header } from '@shared/components/header/header';
import { adminDashboardCards, employeeDashboardCards } from '@shared/constants/cards';
import { Table } from '@shared/components/table/table';
import { toastNotifications } from '@shared/constants/toast';
import { finalize } from 'rxjs';
import { Leave, LeaveStatus } from '@shared/models/leave';
import { ToastService } from '@core/services/toast/toast';
import { LeaveService } from '@core/services/leave/leave';

@Component({
  selector: 'app-dashboard',
  imports: [Header, CardModule, Table],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly leaveService = inject(LeaveService);
  private readonly toast = inject(ToastService);
  protected readonly isFetching = signal(false);
  protected readonly leaves = signal<Leave[]>([]);
  protected readonly cards = employeeDashboardCards;
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
        next: (res) => this.leaves.set(res),
        error: ({ error }) => this.toast.show(operations.fetchFailed, status.error, error.message),
      });
  }
}
