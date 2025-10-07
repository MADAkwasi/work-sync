import { inject, Injectable } from '@angular/core';
import { Api } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class Leave {
  private readonly apiService = inject(Api)
}
