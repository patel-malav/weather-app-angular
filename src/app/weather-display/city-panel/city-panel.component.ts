import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-city-panel',
  templateUrl: './city-panel.component.html',
  styleUrls: ['./city-panel.component.css'],
})
export class CityPanelComponent implements OnInit {
  constructor(private weather: WeatherDataService) {}

  ngOnInit(): void {
    // this.weather
    //   .getForecast({ name: 'ahmedabad' })
    //   .subscribe((data) => console.log(data));
  }
}
