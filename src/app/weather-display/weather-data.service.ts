import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, timer } from 'rxjs';

import { environment } from '../../environments/environment';
import { CurrentWeather } from './current-weather.interface';
import { ForecastWeather } from './forecast-weather.interface';
import { catchError, tap, switchMap, switchMapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  constructor(private http: HttpClient) {}

  searchCity(
    name: string | { city: string; state?: string; country?: string },
    time?: number
  ): Observable<CurrentWeather | null> {
    let q = '';

    if (typeof name === 'string') {
      q += name;
    } else if (typeof name === 'object') {
      console.log(name);
      if (name.city) {
        q += name.city;
        if (name.state) {
          q += ',' + name.state;
          if (name.country) {
            q += ',' + name.country;
          }
        }
      }
    }

    if (q) {
      let out = of(null);
      if (time > 0) {
        console.log('timme');
        out = out.pipe(switchMapTo(timer(0, time)));
      }
      out = out.pipe(
        switchMapTo(
          this.http.get<CurrentWeather>(
            environment.openweatherApi + 'weather',
            {
              params: { q, appid: environment.openweatherApiKey },
            }
          )
        ),
        tap(this.storeData)
      );
      return out;
      // return this.http
      //   .get<CurrentWeather>(environment.openweatherApi + 'weather', {
      //     params: {
      //       q,
      //       appid: environment.openweatherApiKey,
      //     },
      //   })
      //   .pipe(tap(this.storeData));
    } else {
      return of(null);
    }
  }

  /**
   * @todo - Implement Method to get forecast data
   */

  // getForecast({
  //   cityId,
  //   name,
  // }: {
  //   cityId?: string | number;
  //   name?: string;
  // }): Observable<ForecastWeather | null> {
  //   if (cityId) {
  //     return this.http.get<ForecastWeather>(
  //       environment.openweatherApi + 'forecast',
  //       {
  //         params: {
  //           id: cityId.toString(),
  //           appid: environment.openweatherApiKey,
  //         },
  //       }
  //     );
  //   } else if (name) {
  //     return this.http.get<ForecastWeather>(
  //       environment.openweatherApi + 'forecast',
  //       {
  //         params: { q: name, appid: environment.openweatherApiKey },
  //       }
  //     );
  //   } else {
  //     return of(null);
  //   }
  // }

  storeData(data: CurrentWeather): void {
    if (data) {
      localStorage.setItem(data.name.toLowerCase(), JSON.stringify(data));
    }
  }

  retriveStoredData(name: string): null {
    if (name) {
      return JSON.parse(localStorage.getItem(name));
    }
  }
}
