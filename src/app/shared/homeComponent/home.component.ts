import { Component } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
})
export class Home {
  constructor(private router: Router) { }

  latitude = "";
  lognitude = "";

  getWeatherData(){
    this.router.navigate(['/results/' + this.latitude + '/' + this.lognitude])
  }
}
