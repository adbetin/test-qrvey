import { CountryData, Language } from './country-data';
export class Country {
  private _code: string;
  private _name: string;
  private _region: string;
  private _population: number;
  private _capital: string;
  private _currency: string;
  private _language: string;
  private _borders: string[];
  private _flag: string;

  public favoriteId = 0;

  constructor(data: CountryData) {
    this._name = data.name;
    this._region = data.region || 'Undefined';
    this._borders = data.borders;
    this._code = data.alpha3Code;
    this._population = data.population;
    this._capital = data.capital || 'Undefined';
    this._currency = data.currencies.length > 0 ? data.currencies[0].name : 'Undefined';
    this._language = data.languages.length > 0 ? data.languages[0].name : 'Undefined';
    this._flag = data.flag;
  }

  public get name() {
    return this._name;
  }

  public get region() {
    return this._region;
  }

  public get borders(){
    return this._borders;
  }

  public get code(){
    return this._code;
  }

  public get population(){
    return this._population;
  }

  public get capital(){
    return this._capital;
  }

  public get currency(){
    return this._currency;
  }

  public get language(){
    return this._language;
  }

  public get flag(){
    return this._flag;
  }

  public get isFavorite(){
    return this.favoriteId !== 0;
  }
}

export class Region {
  constructor(private _name: string, private _countries: Array<Country>) {}

  public get name() {
    return this._name || 'Undefined';
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
