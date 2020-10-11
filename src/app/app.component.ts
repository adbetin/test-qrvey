import { Component, OnInit, ViewChild } from '@angular/core';
import { Country, World } from './models/country';
import { Observable, throwError } from 'rxjs';

import { CountryModalComponent } from './components/country-modal/country-modal.component';
import { WorldService } from './services/world.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  world$: Observable<World>;
  activeCountry: Country = null;
  errorObject = null;

  @ViewChild('countryModal') countryModal: CountryModalComponent;

  constructor(private worldService: WorldService) {}

  ngOnInit(): void {
    this.onCountrySearch();
  }

  onCountrySearch(value: string = ''){
    this.world$ = this.worldService.getWorld(value).pipe(
      catchError((err) => {
        this.errorObject = 'Error loading data';
        return throwError(err);
      })
    );
  }

  showDetail(country: Country){
    this.activeCountry = country;
    this.countryModal.show();
  }
}
