import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api';
import { endpoints } from '@shared/constants/endpoints';
import { Observable } from 'rxjs';
import { UserRequest } from '@shared/models/auth';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiService = inject(ApiService);
  private readonly endpoint = endpoints.users;

  public createNewUser(leaveData: UserRequest): Observable<UserRequest> {
    return this.apiService.post<UserRequest>(this.endpoint.handleUsers, leaveData);
  }
}
