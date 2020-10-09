import { Component, OnInit } from '@angular/core';

import { Country } from './../../models/country';
import { CountryService } from './../../services/country.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  countries: Observable<Country[]>;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countries = this.countryService.getCountries();
  }

}
