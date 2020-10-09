import { CountryData } from './../models/country-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryRemoteService {

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<CountryData[]> {
    return this.httpClient.get<CountryData[]>(environment.countriesUrl);
  }
}
