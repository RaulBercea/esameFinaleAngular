import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetMeteoResolver } from 'src/resolvers/getMeteo.resolver';
import { Home } from './shared/homeComponent/home.component';
import { Results } from './shared/resultsComponent/results.component';

const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'results/:lat/:long',
    component: Results,
    resolve: {
      meteo: GetMeteoResolver,
    },
  },
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: Home },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
