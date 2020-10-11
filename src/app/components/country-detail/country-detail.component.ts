import { Component, Input, OnInit } from '@angular/core';

import { Country } from './../../models/country';
import { WorldService } from './../../services/world.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent implements OnInit {
  @Input() country: Country;
  public countryBorders: string[];

  constructor(private worldService: WorldService) {}

  ngOnInit(): void {
    this.countryBorders = this.worldService.getCountryBorders(this.country);
  }
}
