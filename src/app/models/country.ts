import { CountryData } from './country-data';
export class Country {
  private _name: string;
  private _region: string;

  constructor(data: CountryData, private _selected: boolean = false) {
    this._name = data.name;
    this._region = data.region;
  }

  public get name() {
    return this._name;
  }

  public get region() {
    return this._region;
  }

  public get selected() {
    return this._selected;
  }
}

export class Region {
  constructor(private _name: string, private _countries: Array<Country>) {}

  public get name() {
    return this._name || 'No definido';
  }

  public get countries() {
    return this._countries;
  }
}

export class World {
  _regions: Array<Region>;
  constructor() {
    this._regions = new Array();
  }

  public get regions() {
    return this._regions;
  }
}
