import { Component, computed, inject, input, signal, OnInit, effect } from '@angular/core';
import { Leave } from '@shared/models/leave';
import { LeaveDurationPipe } from '@core/pipes/leave-duration/leave-duration';
import { Button } from '../button/button';
import { CommonModule, DatePipe } from '@angular/common';
import {
  adminTableColumns,
  employeeTableColumns,
  viewAllTableColumns,
} from '@shared/constants/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Pagination } from '../pagination/pagination';
import { Icon } from '../icon/icon';
import { LeaveService } from '@core/services/leave/leave';
import { finalize } from 'rxjs';
import { ToastService } from '@core/services/toast/toast';
import { toastNotifications } from '@shared/constants/toast';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [
    Button,
    DatePipe,
    LeaveDurationPipe,
    TagModule,
    IconFieldModule,
    InputIconModule,
    FloatLabelModule,
    InputTextModule,
    Pagination,
    Icon,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './table.html',
})
export class Table {
  private readonly leaveService = inject(LeaveService);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  protected readonly isResponding = signal(false);
  protected readonly pageItems = signal([]);
  protected readonly openLeaveContextId = signal<number | null>(null);
  public readonly variant = input<'standard' | 'pending' | 'view-all'>('standard');
  public readonly data = input.required<Leave[]>();
  public readonly tableData = signal<Leave[]>([]);
  protected readonly currentPage = signal(1);
  protected readonly amountOnDisplay = computed(() =>
    this.variant() === 'standard' ? 7 : this.variant() === 'pending' ? 3 : 5
  );
  protected readonly skeletonTableRows = computed(() =>
    this.variant() === 'standard'
      ? Array.from({ length: 7 })
      : this.variant() === 'pending'
      ? Array.from({ length: 3 })
      : Array.from({ length: 5 })
  );
  protected readonly headColumns = computed(() =>
    this.variant() === 'standard'
      ? employeeTableColumns
      : this.variant() === 'pending'
      ? adminTableColumns
      : viewAllTableColumns
  );

  protected readonly paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.amountOnDisplay();
    const end = start + this.amountOnDisplay();
    return this.tableData().slice(start, end);
  });

  protected readonly totalRecords = computed(() => this.tableData().length);
  protected readonly searchForm = this.fb.group({ query: [''] });
  public readonly isLoadingData = input(false);

  constructor() {
    effect(() => this.tableData.set(this.data()));
  }

  protected handlePageChange(page: number) {
    this.currentPage.set(page);
  }

  protected toggleLeaveContext(leaveIndex: number, event: Event): void {
    event.stopPropagation();
    this.openLeaveContextId.set(this.openLeaveContextId() === leaveIndex ? null : leaveIndex);
  }

  protected searchLeaveByEmployeeName(): void {
    const query = this.searchForm.controls.query.value ?? '';
    if (!query) {
      this.tableData.set(this.data());
      return;
    }

    if (query.length > 0 && this.variant() === 'view-all') {
      const filteredLeaves = this.data().filter((leave) => {
        const name = leave.user_username ?? '';

        return name.toLowerCase().includes(query.toLowerCase());
      });
      this.tableData.set(filteredLeaves);
    }
  }

  protected handleLeaveRequest(leaveId: number, action: 'approve' | 'reject'): void {
    const { operations, status } = toastNotifications;
    this.isResponding.set(true);

    this.leaveService
      .handleLeaveRequest(leaveId, action)
      .pipe(
        finalize(() => {
          this.openLeaveContextId.set(null);
          this.isResponding.set(false);
        })
      )
      .subscribe({
        next: () => {
          this.tableData.update((leaves) => leaves.filter((leave) => leave.id !== leaveId));
          this.toast.show(operations.updateRequest, status.success);
        },
        error: ({ error }) => this.toast.show(operations.actionFailed, status.error, error.message),
      });
  }
}
