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
  @Input() name: string;
  edit = false;
  input = false;
  data: Observable<CurrentWeather>;
  error: HttpErrorResponse;
  constructor(public weather: WeatherDataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.data = this.weather.searchCity(changes.name.currentValue, 30000).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err);
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

  toggleInput(): void {
    this.input = !this.input;
  }

  toggleEdit(): void {
    this.edit = !this.edit;
    this.input = !this.input;
  }

  search(input: HTMLInputElement): void {
    /**
     * @todo Implement Input Sanitization to required format
     */
    const [city, state, country] = input.value.split(',');
    this.name = city;
    this.data = this.weather.searchCity({ city }, 30000).pipe(
      catchError((err) => {
        console.log(err);
        this.error = err;
        this.name = null;
        return of(null);
      }),
      tap(console.log)
    );
  }
}
