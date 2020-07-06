import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { WeatherDisplayModule } from './weather-display/weather-display.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule, HttpClientModule, WeatherDisplayModule],
  providers: [],
  bootstrap: [AppComponent],
})
// @ts-ignore - Lint Errors
export class AppModule {}
