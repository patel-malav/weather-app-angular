import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityPanelComponent } from './city-panel/city-panel.component';
import { OverviewPanelComponent } from './overview-panel/overview-panel.component';
import { WeatherPanelComponent } from './weather-panel/weather-panel.component';
import { CityComponent } from './city/city.component';
import { TempraturePipe } from './temprature.pipe';
import { PressurePipe } from './pressure.pipe';
import { SpeedPipe } from './speed.pipe';

@NgModule({
  declarations: [
    CityPanelComponent,
    OverviewPanelComponent,
    WeatherPanelComponent,
    CityComponent,
    TempraturePipe,
    PressurePipe,
    SpeedPipe,
  ],
  imports: [CommonModule],
  exports: [CityPanelComponent, OverviewPanelComponent, WeatherPanelComponent],
})

// @ts-ignore - Liniting Error Angular 10
export class WeatherDisplayModule {}
