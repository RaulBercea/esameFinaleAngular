import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class apiService {
  constructor(private httpClient: HttpClient) {}

  getSunsetAndSunrise(lat: string, long: string) {
    return this.httpClient.get(`
    https://api.sunrisesunset.io/json?lat=${lat}&lng=${long}&timezone=UTC&date=today
    `);
  }

  getMeteo(lat: string, long: string) {
    return this.httpClient.get(`
    https://www.7timer.info/bin/astro.php?lon=${long}&lat=${lat}&ac=0&unit=metric&output=json&tzshift=0
    `);
  }
}
