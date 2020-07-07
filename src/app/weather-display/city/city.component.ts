import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { WeatherDataService } from '../weather-data.service';

import { CurrentWeather } from '../current-weather.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent implements OnChanges {
  @Input() name: string; // Input prop for @todo State Management
  edit = false; // edit toggle flag
  input = false; // input toggle flag

  data: Observable<CurrentWeather>; // data from Weather Data Service
  error: HttpErrorResponse; // Errors

  constructor(public weather: WeatherDataService) {}

  // On Input prop change
  ngOnChanges(changes: SimpleChanges): void {
    // Get data
    this.data = this.weather.searchCity(changes.name.currentValue, 30000).pipe(
      // Error Handler
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        switch (err.status) {
          case 0: // Indicated Offline status then get data from Local Storage
            return of(this.weather.retriveStoredData(this.name));
          case 404: // Indicated Bad Request then return null
            this.error = err;
            this.name = null;
            return of(null);
          default:
            return of(null);
        }
      }),
      tap(console.log)
    );
  }

  // Toggle Input Mode
  toggleInput(): void {
    this.input = !this.input;
  }

  // Toggle Edit Mode
  toggleEdit(): void {
    this.edit = !this.edit;
    this.input = !this.input;
  }

  // Search the input data
  search(input: HTMLInputElement): void {
    /**
     * @todo Implement Input Sanitization to required format
     */
    const [city, state, country] = input.value.split(',');
    this.name = city;
    // Get Data
    this.data = this.weather.searchCity({ city }, 30000).pipe(
      // Error Handler
      catchError((err) => {
        switch (err.status) {
          case 0:
            return of(this.weather.retriveStoredData(this.name));
          case 404:
            this.error = err;
            this.name = null;
            return of(null);
          default:
            return of(null);
        }
      }),
      tap(console.log)
    );
  }
}
