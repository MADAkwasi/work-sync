import { inject, Injectable } from '@angular/core';
import { endpoints } from '@shared/constants/endpoints';
import { ApiService } from '../api/api';
import { Leave } from '@shared/models/leave';
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
}
