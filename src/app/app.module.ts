import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Home } from './shared/homeComponent/home.component';
import { Results } from './shared/resultsComponent/results.component';
@NgModule({
  declarations: [AppComponent, Home, Results],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
