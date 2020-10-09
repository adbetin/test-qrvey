import { Region, World } from './../models/country';

import { Country } from '../models/country';
import { CountryData } from './../models/country-data';
import { CountryRemoteService } from '../repository/country-remote.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WorldService {
  // private _favCountries: Array<CountryView> = [];

  constructor(
    // private dataService: CountryDataService,
    private remoteService: CountryRemoteService
  ) {}

  getWorld(): Observable<World> {
    return this.remoteService.getCountries().pipe(
      // map all items as Country objects
      map((data) => data.map((item) => new Country(item as CountryData))),

      // group elements by region on a plainWorld object
      map((data) => {
        const plainWorld: { [region: string]: Array<Country> } = {};
        const reduced = data.reduce((world, country) => {
          world[country.region] = [...(world[country.region] || []), country];
          return world;
        }, plainWorld);
        return reduced;
      }),

      // cast plain world to World object
      map((plainWorld) => {
        const world = new World();
        Object.keys(plainWorld).forEach((key) => {
          world.regions.push(new Region(key, plainWorld[key]));
        });
        console.log('world', world);
        return world;
      })
    );
  }
}
