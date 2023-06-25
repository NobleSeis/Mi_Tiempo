import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherForecast(
    location: string,
    days: string,
    alerts: string
  ): Observable<any> {
    return this.http.get(
      `http://api.weatherapi.com/v1/forecast.json?key=4ed89c8c6a3d4799b92173840232206&q=${location}&days=${days}&aqi=no&alerts=${alerts}`
    );
  }
}
