import { LeaveDurationPipe } from '@core/pipes/leave-duration/leave-duration';
import { Component, signal } from '@angular/core';
import { Button } from '../button/button';
import { DatePipe } from '@angular/common';
import { columns } from '@shared/constants/table';
import { EMPLOYEE_LEAVES } from '@shared/constants/leave';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-table',
  imports: [Button, DatePipe, LeaveDurationPipe, TagModule],
  templateUrl: './table.html',
})
export class Table {
  protected readonly headColumns = columns;
  protected readonly leaves = signal(EMPLOYEE_LEAVES);
  protected readonly pageItems = signal([]);
}
