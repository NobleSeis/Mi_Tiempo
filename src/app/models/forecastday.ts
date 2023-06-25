import { Day } from './day';
import { Hour } from './hour';

export class Forecastday {
  date!: string;
  date_epoch!: number;
  day!: Day;
  astro!: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: number;
    is_moon_up: number;
    is_sun_up: number;
  };
  hour!: Hour[];
}
