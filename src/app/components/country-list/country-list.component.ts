import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Country, Region } from './../../models/country';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent {
  @Input() region: Region;
  @Output() countryClicked = new EventEmitter<Country>();

  onClicked(country: Country){
    this.countryClicked.emit(country);
  }
}