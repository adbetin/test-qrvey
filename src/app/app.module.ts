import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryDialogComponent } from './components/country-dialog/country-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
