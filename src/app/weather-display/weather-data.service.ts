import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  constructor(private http: HttpClient) {}

  searchCity(name: string): null {
    throw new Error('Method Not Yet Implemented');
    return null;
  }

  retriveStoredData(): null {
    throw new Error('Method Not Yet Implemented');
    return null;
  }
}
