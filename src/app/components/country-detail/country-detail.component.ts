import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Country } from './../../models/country';
import { WorldService } from './../../services/world.service';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';

/**
 * component used for show a single country's detail
 */
@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent implements OnChanges {
  @Input() country: Country;
  @Input() countryBorders: string[];

  emptyStar = emptyStar;
  fullStar = fullStar;

  constructor(private worldService: WorldService) {}

  ngOnChanges(_changes: SimpleChanges) {
    this.countryBorders = this.worldService.getCountryBorders(this.country);
  }

  /**
   * @description add a country to favorite list
   * @param country country to agregate
   */
  addFavorite(country: Country) {
    this.worldService.addFavorite(country);
  }

  /**
   * @description remove a country to favorite list
   * @param country country to remove
   */
  removeFavorite(country: Country) {
    this.worldService.removeFavorite(country);
  }
}
