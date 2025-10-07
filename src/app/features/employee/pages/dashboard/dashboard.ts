import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Header } from '@shared/components/header/header';
import { employeeDashboardCards } from '@shared/constants/cards';
import { Table } from "@shared/components/table/table";
import { EMPLOYEE_LEAVES } from '@shared/constants/leave';

@Component({
  selector: 'app-dashboard',
  imports: [Header, CardModule, Table],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  protected readonly cards = employeeDashboardCards;
  protected readonly leaves = EMPLOYEE_LEAVES
}
