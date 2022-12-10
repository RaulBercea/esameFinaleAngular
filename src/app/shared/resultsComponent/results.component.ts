import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

type dataseries = {
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
            if (data.timepoint > 24 && data.timepoint <= 48) {
              data.timepoint -= 24;
            } else if (data.timepoint > 48) {
              data.timepoint -= 48;
            }

            // adding icons to the data
            if (data.cloudcover <= '2') {
              data.icon = 'bi bi-sun';
            }

            if (data.cloudcover <= '6') {
              data.icon = 'bi bi-cloud-sun';
            }

            if (data.cloudcover == '7' && data.rh2m < 90) {
              data.icon = 'bi bi-cloud';
            }

            if (data.cloudcover > '8') {
              data.icon = 'bi bi-clouds';
            }

            if (data.cloudcover > '7' && data.rh2m > 90) {
              data.icon = 'bi bi-cloud-fog';
            }

            if (data.prec_type == 'rain') {
              data.icon = 'bi bi-cloud-rain';
            }

            if (data.prec_type == 'snow') {
              data.icon = 'bi bi-snow';
            }

            // converting the cloud cover into a percentage
            switch (data.cloudcover.toString()) {
              case '1':
                data.cloudcover = '0%-6%';
                break;
              case '2':
                data.cloudcover = '6%-19%';
                break;
              case '3':
                data.cloudcover = '19%-31%';
                break;
              case '4':
                data.cloudcover = '31%-44%';
                break;
              case '5':
                data.cloudcover = '44%-56%';
                break;
              case '6':
                data.cloudcover = '56%-69%';
                break;
              case '7':
                data.cloudcover = '69%-81%';
                break;
              case '8':
                data.cloudcover = '81%-94%';
                break;
              case '9':
                data.cloudcover = '94%-100%';
                break;
              default:
                break;
            }
          }
        });
    });
  }
}
``;
