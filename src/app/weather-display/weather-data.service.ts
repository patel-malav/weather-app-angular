import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, timer } from 'rxjs';

import { environment } from '../../environments/environment';
import { CurrentWeather } from './current-weather.interface';
import { ForecastWeather } from './forecast-weather.interface';
import { tap, switchMapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  constructor(private http: HttpClient) {}

  /**
   * Get the requested city data from the openweathermap api as Observable
   * @param name : Object with city, state, country or combined query, state
   * and country are optional just to be accurate
   * @param time : interval at which data should be refreshed
   */
  searchCity(
    name: string | { city: string; state?: string; country?: string },
    time?: number
  ): Observable<CurrentWeather | null> {
    /**
     * Query Formation Logic
     */
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

    // If query is a well formed string
    if (typeof q === 'string') {
      // Observable initializer
      let out$ = of(null);
      // If time is specified pipe the timer to query
      if (time > 0) {
        console.log('timme');
        out$ = out$.pipe(switchMapTo(timer(0, time)));
      }
      // Call http get request every time a event is emited incase of
      // interval else executed only once
      out$ = out$.pipe(
        switchMapTo(
          this.http.get<CurrentWeather>(
            environment.openweatherApi + 'weather',
            {
              params: { q, appid: environment.openweatherApiKey },
            }
          )
        ),
        // Store the data for offline usage
        tap(this.storeData)
      );
      return out$;
    } else {
      // Return null incase of malformed query
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

  /**
   * Store the data in localstorage in case of user went offline
   * @param data : data recived from the openweather api
   */
  storeData(data: CurrentWeather): void {
    if (Object.keys(data).length) {
      // Serialize data to be stored
      localStorage.setItem(data.name.toLowerCase(), JSON.stringify(data));
    }
  }

  /**
   * Retrive stored data from the localstorage
   * @param name : city as key to stored data
   */

  retriveStoredData(name: string): null {
    if (typeof name === 'string') {
      // Parse the stored data
      return JSON.parse(localStorage.getItem(name));
    }
  }
}
