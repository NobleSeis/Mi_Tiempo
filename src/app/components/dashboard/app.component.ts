import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';

import { Weather } from 'src/app/models/weather';
import { WeatherService } from 'src/app/servicios/weather-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Mi_Tiempo';
  data: Weather = new Weather();
  isLoading = false;

  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    this.isLoading = true;

    // La geolocalización solo funciona desde servidores firmados
    navigator.geolocation.getCurrentPosition(
      (success) => {
        this.loadData(
          `${success.coords.latitude} ${success.coords.longitude}`,
          '7',
          'no'
        );
      },
      (error) => {
        console.log(`No fue posible obtener la localización: ${error.message}`);
        this.loadData('Sevilla', '7', 'yes');
      }
    );
  }

  loadData(place: string, days: string, alerts: 'yes' | 'no') {
    this.weatherService
      .getWeatherForecast(place, days, alerts)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((data) => (this.data = data));
  }
}
