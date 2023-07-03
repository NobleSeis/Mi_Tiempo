import { Component, OnInit } from '@angular/core';
import { addDays, max, parseISO } from 'date-fns';
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
  hours: any;
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
          'yes'
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
      .subscribe((data: Weather) => {
        // Toda la información
        this.data = data;

        // Guardando las horas relevantes en formato fecha
        // Guardo las horas de hoy que sean mayores a la hora actual
        this.hours = data.forecast.forecastday[0].hour
          .filter((hour) => parseISO(hour.time) >= new Date())
          .map((hour) => {
            let time = parseISO(hour.time);
            return { ...hour, time };
          });

        // Añado las horas de mañana hasta la hora actual
        this.hours.push(
          ...data.forecast.forecastday[1].hour
            .filter((hour) => parseISO(hour.time) <= addDays(new Date(), 1))
            .map((hour) => {
              let time = parseISO(hour.time);
              return { ...hour, time };
            })
        );
      });
  }
}
