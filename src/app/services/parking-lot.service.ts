import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CurrentState, MetaData } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ParkingLotService {
  constructor(private apiService: ApiService) {}
  private apiKey = { api_key: 'ZvLKQnzZGN0uzfItIs0zAQlsogl4GVPIEB0DmG1FLs4=' };

  getCurrentState = (): Observable<CurrentState[]> => {
    return this.apiService.get('current-state', {
      params: this.apiKey,
      responseType: 'json',
    });
  };

  getMetaData = (): Observable<MetaData[]> => {
    return this.apiService.get('meta-data', {
      params: this.apiKey,
      responseType: 'json',
    });
  };
}
