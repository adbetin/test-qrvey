import { map, shareReplay } from 'rxjs/operators';

import { Country } from '../models/country';
import { CountryData } from '../models/interfaces/country-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * service to manage remote requests
 */
@Injectable({
  providedIn: 'root',
})
export class CountryRemoteService {
  constructor(private httpClient: HttpClient) {}

  /**
   * @description returns an observable with all remote countries
   */
  getCountries(): Observable<Country[]> {
    return this.httpClient.get<CountryData[]>(environment.countriesUrl).pipe(
      map((data) => data.map((item) => new Country(item as CountryData))),
      // this avoids multiple calls to a service
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
