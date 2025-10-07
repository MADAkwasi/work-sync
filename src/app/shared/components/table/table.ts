import { Component, computed, input, signal } from '@angular/core';
import { EmployeeLeave } from '@shared/models/leave';
import { LeaveDurationPipe } from '@core/pipes/leave-duration/leave-duration';
import { Button } from '../button/button';
import { DatePipe } from '@angular/common';
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
import { SelectModule } from 'primeng/select';
import { date, status } from '@shared/constants/filter';
import { Pagination } from '../pagination/pagination';

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
    SelectModule,
    Pagination,
  ],
  templateUrl: './table.html',
})
export class Table {
  protected readonly headColumns = computed(() =>
    this.variant() === 'standard'
      ? employeeTableColumns
      : this.variant() === 'pending'
      ? adminTableColumns
      : viewAllTableColumns
  );
  protected readonly statusFilter = status;
  protected readonly dateFilter = date;
  protected readonly pageItems = signal([]);
  public readonly variant = input<'standard' | 'pending' | 'view-all'>('standard');
  public readonly data = input.required<EmployeeLeave[]>();
  protected readonly currentPage = signal(1);
  protected readonly amountOnDisplay = computed(() =>
    this.variant() === 'standard' ? 7 : this.variant() === 'pending' ? 3 : 5
  );

  protected readonly paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.amountOnDisplay();
    const end = start + this.amountOnDisplay();
    return this.data().slice(start, end);
  });

  protected readonly totalRecords = computed(() => this.data().length);

  protected handlePageChange(page: number) {
    this.currentPage.set(page);

    console.log(this.paginatedData());
    console.log(this.currentPage());
  }
}
