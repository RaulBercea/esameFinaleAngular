import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

type dataseries = {
  cloudcover: number;
  lifted_index: number;
  prec_type: string;
  rh2m: number;
  seeing: number;
  temp2m: number;
  timepoint: number;
  transparency: number;
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

  sunRes: any = {
    sunrise: "",
    sunset: "",
  };


  meteoRes: dataseries[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.apiService.getSunsetAndSunrise(params['lat'], params['long'])
      .subscribe((res:any)=>{
        this.sunRes.sunrise = res.results.sunrise;
        this.sunRes.sunset = res.results.sunset;
      });

      this.apiService.getMeteo(params['lat'], params['long'])
      .subscribe((res:any)=>{
        console.log(res)
        this.meteoRes = res.dataseries;
      })
    });
  }
}