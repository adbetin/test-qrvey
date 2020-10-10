import { Component, ElementRef, HostListener } from '@angular/core';

import { Country } from './../../models/country';

@Component({
  selector: 'app-country-modal',
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.scss'],
})
export class CountryModalComponent {
  private _country: Country = null;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    _event: KeyboardEvent
  ) {
    this.hide();
  }

  public get country() {
    return this._country;
  }

  public show = (country: Country) => (this._country = country);
  public hide = () => (this._country = null);
}
