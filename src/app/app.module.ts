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
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { ServiceWorkerModule } from '@angular/service-worker';
import { dbConfig } from './app.database';
import { environment } from '../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxIndexedDBModule.forRoot(dbConfig),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
