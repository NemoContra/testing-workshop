import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FlightsModule } from './flights/flights.module';
import { FlightSearchModule } from './flight-search/flight-search.module';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { YesNoPipe } from '@testing-workshop/client-shared/util/common';
import { ColorRedDirective } from './color-red.directive';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FlightsModule,
    FlightSearchModule,
    YesNoPipe,
    ColorRedDirective,
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    HelloWorldComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
