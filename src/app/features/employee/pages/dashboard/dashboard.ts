import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LeaveService } from '@core/services/leave/leave';
import { CardModule } from 'primeng/card';
import { Header } from '@shared/components/header/header';
import { Table } from '@shared/components/table/table';
import { Leave, LeaveStatus } from '@shared/models/leave';
import { ToastService } from '@core/services/toast/toast';
import { toastNotifications } from '@shared/constants/toast';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [Header, CardModule, Table],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private readonly leaveService = inject(LeaveService);
  private readonly toast = inject(ToastService);
  protected readonly isFetching = signal(false);
  protected readonly leaves = signal<Leave[]>([]);
  protected readonly pendingRequests = computed(
    () => this.leaves().filter((leave) => leave.status === LeaveStatus.PENDING).length
  );
  protected readonly approvedRequests = computed(
    () => this.leaves().filter((leave) => leave.status === LeaveStatus.APPROVED).length
  );
  protected readonly usedLeaves = computed(
    () =>
      this.leaves().filter((leave) => {
        const today = new Date();
        const start = new Date(leave.start_date);
        const end = new Date(leave.end_date);
        return end <= today && leave.status === LeaveStatus.APPROVED;
      }).length
  );

  ngOnInit(): void {
    this.fetchLeaves();
  }

  protected fetchLeaves(): void {
    const { operations, status } = toastNotifications;
    this.isFetching.set(true);

    this.leaveService
      .getMyLeaves()
      .pipe(finalize(() => this.isFetching.set(false)))
      .subscribe({
        next: (res) => this.leaves.set(res),
        error: ({ error }) => this.toast.show(operations.fetchFailed, status.error, error.message),
      });
  }
}
