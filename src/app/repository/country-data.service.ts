import { Country } from './../models/country';
import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { StorageData } from './../models/interfaces/storage-data';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';

const STORE = environment.storeDB;

/**
 * service to manage communication with indexedDB
 */
@Injectable({
  providedIn: 'root',
})
export class CountryDataService {
  constructor(private dbService: NgxIndexedDBService<StorageData>) {}

  /**
   * @description return observable with all countries on favorite list
   */
  getAllFavCountries(): Observable<StorageData[]> {
    return this.dbService.getAll(STORE);
  }

  /**
   * @description adds a country to favorite list
   * @param country country to add
   */
  addFavCountry(country: Country): Observable<number> {
    return this.dbService.add(STORE, {
      name: country.name,
      code: country.code,
    });
  }

  /**
   * removes a country from favorite list
   * @param key favorite id
   */
  removeFavCountry(key: number): Observable<number> {
    return this.dbService.delete(STORE, key).pipe(map((_data) => key));
  }
}
