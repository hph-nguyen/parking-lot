import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = 'https://api.parking-pilot.com/parkinglots/';

  get<T>(path: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(
      this.baseUrl + path,
      options
    ) as Observable<T>;
  }
}
