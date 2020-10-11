import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-country-modal',
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.scss'],
})
export class CountryModalComponent {
  private _active = false;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    _event: KeyboardEvent
  ) {
    this.hide();
  }

  public get active() {
    return this._active;
  }

  public show = () => (this._active = true);
  public hide = () => (this._active = false);
}
