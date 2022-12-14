import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { apiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class GetMeteoResolver implements Resolve<any> {
  constructor(private apiService: apiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.apiService.getMeteo(
      route.paramMap.get('lat')!,
      route.paramMap.get('long')!
    );
  }
}
