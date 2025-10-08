import { inject, Injectable } from '@angular/core';
import { endpoints } from '@shared/constants/endpoints';
import { ApiService } from './../api/api';
import { environment } from '@core/environments/environment';
import { AuthRequest, AuthResponse, JwtPayload } from '@shared/models/auth';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.WORK_SYNC_API;
  private readonly apiService = inject(ApiService);
  private readonly endpoint = endpoints.auth;

  public login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>(this.endpoint.login, credentials).pipe(
      tap((res) => {
        if (res) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('apiKey', res.apiKey);

          const payload = this.decodeJwt(res.token);
          if (payload) {
            localStorage.setItem('role', payload.role);
            localStorage.setItem('username', payload.username);
          }
        }
      })
    );
  }

  public register(credentials: AuthRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>(this.endpoint.register, credentials).pipe(
      tap((res) => {
        if (res) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('apiKey', res.apiKey);

          const payload = this.decodeJwt(res.token);
          if (payload) {
            localStorage.setItem('role', payload.role);
            localStorage.setItem('username', payload.username);
          }
        }
      })
    );
  }

  public logout(): Observable<void> {
    const key = localStorage.getItem('apiKey');

    return this.apiService.post<void>(this.endpoint.logout, { key }).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('apiKey');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
      })
    );
  }

  private decodeJwt(token: string): JwtPayload | null {
    try {
      const payloadBase64 = token.split('.')[1];
      const decoded = atob(payloadBase64);
      return JSON.parse(decoded) as JwtPayload;
    } catch {
      return null;
    }
  }
}
