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
}
