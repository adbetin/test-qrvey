import { Country } from './country';
export class Region {
  constructor(private _name: string, private _countries: Array<Country>) {}

  public get name() {
    return this._name || 'Undefined';
  }

  public get countries() {
    return this._countries;
  }
}
