import { Component, computed, input, signal } from '@angular/core';
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
import { date, status } from '@shared/constants/filter';
import { Pagination } from '../pagination/pagination';
import { Icon } from '../icon/icon';

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
  ],
  templateUrl: './table.html',
})
export class Table {
  protected readonly statusFilter = status;
  protected readonly dateFilter = date;
  protected readonly pageItems = signal([]);
  protected readonly openLeaveContextId = signal<number | null>(null);
  public readonly variant = input<'standard' | 'pending' | 'view-all'>('standard');
  public readonly data = input.required<Leave[]>();
  protected readonly currentPage = signal(1);
  protected readonly amountOnDisplay = computed(() =>
    this.variant() === 'standard' ? 7 : this.variant() === 'pending' ? 3 : 5
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
    return this.data().slice(start, end);
  });

  protected readonly totalRecords = computed(() => this.data().length);

  protected handlePageChange(page: number) {
    this.currentPage.set(page);
  }

  protected toggleLeaveContext(leaveIndex: number, event: Event): void {
    event.stopPropagation();
    this.openLeaveContextId.set(this.openLeaveContextId() === leaveIndex ? null : leaveIndex);
  }

  protected handleLeaveRequest(): void {
    this.openLeaveContextId.set(null);
  }
}
