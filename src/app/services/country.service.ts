import { Observable, of } from 'rxjs';
import { flatMap, groupBy, map } from 'rxjs/operators';

import { Country } from './../models/country';
import { CountryRemoteService } from './../repository/country-remote.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  // private _favCountries: Array<CountryView> = [];

  constructor(
    // private dataService: CountryDataService,
    private remoteService: CountryRemoteService
  ) {}

  getCountries(): Observable<Country[]> {
    /*const lista = [
      { name: 'albania' },
      { name: 'argentina' },
      { name: 'brasil' },
      { name: 'colombia' },
      { name: 'sudan' },
      { name: 'zaire' },
    ];*/

    return this.remoteService.getCountries().pipe(
      map((data) => data.map((item) => new Country(item as any))),
      // groupBy<string, Country[]>((country) => country)
    );
  }
}
