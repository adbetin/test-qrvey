import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Country } from './../../models/country';
import { WorldService } from './../../services/world.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent implements OnChanges {
  @Input() country: Country;
  @Input() countryBorders: string[];

  constructor(private worldService: WorldService) {}

  ngOnChanges(_changes: SimpleChanges) {
    this.countryBorders = this.worldService.getCountryBorders(this.country);
  }

  addFavorite(country: Country){
    this.worldService.addFavorite(country);
  }

  removeFavorite(country: Country){
    this.worldService.removeFavorite(country);
  }
}
