import { Region } from './region';

export class World {
  _regions: Array<Region>;
  constructor() {
    this._regions = new Array();
  }

  public get regions() {
    return this._regions;
  }
}
