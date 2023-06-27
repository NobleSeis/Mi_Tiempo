import { Component, OnInit } from '@angular/core';
import { finalize, switchMap } from 'rxjs';

import { Weather } from './models/weather';
import { WeatherService } from './servicios/weather-service.service';
import { IpService } from './servicios/ip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Mi_Tiempo';
  data: Weather = new Weather();
  isLoading = false;

  constructor(
    private weatherService: WeatherService,
    private ipService: IpService
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.ipService
      .getIp()
      .pipe(
        finalize(() => (this.isLoading = false)),
        switchMap((data: { ip: string }) =>
          this.weatherService.getWeatherForecast(data.ip, '3', 'yes')
        )
      )
      .subscribe((data) => (this.data = data));
  }
}
