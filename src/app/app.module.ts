import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryModalComponent } from './components/country-modal/country-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
