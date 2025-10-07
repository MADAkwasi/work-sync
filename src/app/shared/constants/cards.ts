import { CardData } from '../models/card';

export const employeeDashboardCards: CardData[] = [
  {
    title: 'Total Leave Balance',
    content: '15 days',
  },
  {
    title: 'Pending Requests',
    content: '2',
  },
  {
    title: 'Approved Requests',
    content: '3',
  },
  {
    title: 'Used Leave Days',
    content: '5 days',
  },
];

export const adminDashboardCards: CardData[] = [
  {
    title: 'Pending Approvals',
    content: '3',
  },
  {
    title: 'Absences Today',
    content: '5',
  },
  {
    title: 'Absences This Week',
    content: '12',
  },
  {
    title: 'Total Leave Days This Month',
    content: '45',
  },
];
