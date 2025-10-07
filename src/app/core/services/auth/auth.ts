import { endpoints } from '@shared/constants/endpoints';
import { inject, Injectable } from '@angular/core';
import { Api } from '../api/api.service';
import { AuthRequest, AuthResponse } from '@shared/models/auth';
import { HttpResourceRef } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly apiService = inject(Api);
  private readonly endpoint = endpoints.auth;

  public login(authBody: AuthRequest): HttpResourceRef<AuthResponse | undefined> {
    return this.apiService.post<AuthResponse, AuthRequest>(this.endpoint.login, authBody);
  }
}
