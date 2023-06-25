import { Component, OnInit } from '@angular/core';
import { WeatherService } from './servicios/weather-service.service';
import { finalize } from 'rxjs';
import { Weather } from './models/weather';

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
    this.weatherService
      .getWeatherForecast('Fuente palmera', '3', 'yes')
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((data) => (this.data = data));
  }
}
