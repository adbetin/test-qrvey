import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CountryBordersPipe } from './pipes/country-borders.pipe';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryModalComponent } from './components/country-modal/country-modal.component';
import { CountryPopulationPipe } from './pipes/country-population.pipe';
import { CountrySearchComponent } from './components/country-search/country-search.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryModalComponent,
    CountrySearchComponent,
    CountryDetailComponent,
    CountryBordersPipe,
    CountryPopulationPipe
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
