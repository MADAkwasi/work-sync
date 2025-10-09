import { inject, Injectable } from '@angular/core';
import { endpoints } from '@shared/constants/endpoints';
import { ApiService } from '../api/api';
import { Leave, LeaveRequest } from '@shared/models/leave';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LeaveService {
  private readonly apiService = inject(ApiService);
  private readonly endpoint = endpoints.leave;

  public getMyLeaves(): Observable<Leave[]> {
    return this.apiService.get<Leave[]>(this.endpoint.getLeave);
  }

  public getAllLeaves(): Observable<Leave[]> {
    return this.apiService.get<Leave[]>(this.endpoint.handleLeave);
  }

  public createLeaveRequest(leaveData: LeaveRequest): Observable<LeaveRequest> {
    return this.apiService.post<LeaveRequest>(this.endpoint.handleLeave, leaveData);
  }

  public handleLeaveRequest(leaveId: number, action: 'approve' | 'reject'): Observable<void> {
    return this.apiService.patch<void>(this.endpoint.handleLeaveRequest(leaveId, action), {});
  }
}
