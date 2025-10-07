import { Injectable } from '@angular/core';
import { httpResource, HttpParams } from '@angular/common/http';
import { environment } from '@core/environments/environment';

@Injectable({ providedIn: 'root' })
export class Api {
  private readonly baseUrl = environment.WORK_SYNC_API;

  public post<TResponse, TBody extends object>(endpoint: string, body: TBody) {
    return httpResource<TResponse>(() => ({
      url: `${this.baseUrl}${endpoint}`,
      method: 'POST',
      body,
    }));
  }

  public get<TResponse>(endpoint: string, params?: Record<string, string | number | boolean>) {
    const httpParams = params ? new HttpParams({ fromObject: params }) : undefined;

    return httpResource<TResponse>(() => ({
      url: `${this.baseUrl}${endpoint}`,
      method: 'GET',
      params: httpParams,
    }));
  }

  public put<TResponse, TBody extends object>(endpoint: string, body: TBody) {
    return httpResource<TResponse>(() => ({
      url: `${this.baseUrl}${endpoint}`,
      method: 'PUT',
      body,
    }));
  }

  public delete<TResponse>(endpoint: string) {
    return httpResource<TResponse>(() => ({
      url: `${this.baseUrl}${endpoint}`,
      method: 'DELETE',
    }));
  }
}
