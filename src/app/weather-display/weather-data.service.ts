import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { CurrentWeather } from './current-weather.interface';
import { ForecastWeather } from './forecast-weather.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  constructor(private http: HttpClient) {}

  searchCity(
    name: string,
    state?: string,
    country?: string
  ): Observable<CurrentWeather | null> {
    let q = '';
    if (name) {
      q += name;
      if (state) {
        q += ',' + state;
        if (country) {
          q += ',' + country;
        }
      }
    } else {
      q = null;
    }

    if (q) {
      return this.http.get<CurrentWeather>(
        environment.openweatherApi + 'weather',
        {
          params: {
            q,
            appid: environment.openweatherApiKey,
          },
        }
      );
    } else {
      return of(null);
    }
  }

  getForecast({
    cityId,
    name,
  }: {
    cityId?: string | number;
    name?: string;
  }): Observable<ForecastWeather | null> {
    if (cityId) {
      return this.http.get<ForecastWeather>(
        environment.openweatherApi + 'forecast',
        {
          params: {
            id: cityId.toString(),
            appid: environment.openweatherApiKey,
          },
        }
      );
    } else if (name) {
      return this.http.get<ForecastWeather>(
        environment.openweatherApi + 'forecast',
        {
          params: { q: name, appid: environment.openweatherApiKey },
        }
      );
    } else {
      return of(null);
    }
  }

  retriveStoredData(): null {
    throw new Error('Method Not Yet Implemented');
    return null;
  }
}
