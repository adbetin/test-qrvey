import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Country } from './../../models/country';
import { Region } from './../../models/region';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';

/**
 * displays a region with its country list
 */
@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent {
  @Input() region: Region;
  @Output() countryClicked = new EventEmitter<Country>();

  fullStar = fullStar;

  onClicked(country: Country) {
    this.countryClicked.emit(country);
  }
}
