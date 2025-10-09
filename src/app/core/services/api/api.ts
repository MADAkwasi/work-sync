import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@core/environments/environment';
import { HttpOptions } from '@shared/models/api';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.WORK_SYNC_API;

  public get<TResponse>(endpoint: string, options?: object): Observable<TResponse> {
    return this.http.get<TResponse>(`${this.baseUrl}/${endpoint}`, options);
  }

  public post<TResponse, TBody = unknown>(
    endpoint: string,
    body: TBody,
    options?: HttpOptions
  ): Observable<TResponse> {
    return this.http.post<TResponse>(`${this.baseUrl}/${endpoint}`, body, options);
  }

  public patch<TResponse, TBody = unknown>(
    endpoint: string,
    body: TBody,
    options?: HttpOptions
  ): Observable<TResponse> {
    return this.http.patch<TResponse>(`${this.baseUrl}/${endpoint}`, body, options);
  }
}
