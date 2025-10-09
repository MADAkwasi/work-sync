import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const apiKey = localStorage.getItem('apiKey');

  let authReq = req;
  if (token && apiKey) {
    authReq = req.clone({
      setHeaders: {
        'x-api-key': apiKey,
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
