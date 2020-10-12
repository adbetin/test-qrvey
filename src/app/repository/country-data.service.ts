import { Country } from './../models/country';
import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';

const STORE = environment.storeDB;

@Injectable({
  providedIn: 'root',
})
export class CountryDataService {
  // TODO: type storage
  constructor(private dbService: NgxIndexedDBService) {}

  getAllFavCountries(): Observable<any> {
    return this.dbService.getAll(STORE);
  }

  addFavCountry(country: Country): Observable<number> {
    return this.dbService.add(STORE, {
      name: country.name,
      code: country.code,
    });
  }

  removeFavCountry(key: number): Observable<number> {
    return this.dbService.delete(STORE, key).pipe(map((_data) => key));
  }
}
