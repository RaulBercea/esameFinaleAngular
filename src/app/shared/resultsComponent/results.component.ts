import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  cloudCoverToPercentage,
  addWeatherIcons,
  convertTimePoint,
} from 'src/app/services/weather.service';

export type dataseries = {
  cloudcover: string;
  lifted_index: number;
  prec_type: string;
  rh2m: number;
  seeing: number;
  temp2m: number;
  timepoint: number;
  transparency: number;
  icon: string;
};

@Component({
  selector: 'Results',
  templateUrl: './results.component.html',
})
export class Results implements OnInit {
  constructor(
    private apiService: apiService,
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) {}

  sunRes = {
    sunrise: '',
    sunset: '',
  };

  lat = 0;
  long = 0;

  meteoRes: dataseries[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.lat = params['lat'];
      this.long = params['long'];

      this.apiService
        .getSunsetAndSunrise(params['lat'], params['long'])
        .subscribe((res: any) => {
          this.sunRes.sunrise = res.results.sunrise;
          this.sunRes.sunset = res.results.sunset;
        });

      this.apiService
        .getMeteo(params['lat'], params['long'])
        .subscribe((res: any) => {
          this.meteoRes = res.dataseries;

          for (const data of this.meteoRes) {
            // converting the timepoint into an hour
            convertTimePoint(data);

            //adding icons
            addWeatherIcons(data);

            // converting the cloud cover into a percentage
            cloudCoverToPercentage(data);
          }
        });
    });
  }
}
