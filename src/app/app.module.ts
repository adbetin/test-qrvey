import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryModalComponent } from './components/country-modal/country-modal.component';
import { CountrySearchComponent } from './components/country-search/country-search.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryModalComponent,
    CountrySearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
