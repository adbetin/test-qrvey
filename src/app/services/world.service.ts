import { BehaviorSubject, Observable } from 'rxjs';
import { Region, World } from './../models/country';
import { filter, map } from 'rxjs/operators';

import { Country } from '../models/country';
import { CountryRemoteService } from '../repository/country-remote.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorldService {
  private countries: Observable<Country[]>;
  // private _favCountries: Array<CountryView> = [];

  constructor(
    // private dataService: CountryDataService,
    private remoteService: CountryRemoteService
  ) {}

  getWorld(query?: string): Observable<World> {
    return this.createWorld(query);
  }

  // TODO: split
  private createWorld(query?: string): Observable<World> {
    return this.getCountries()
      // filter pipe for queries
      .pipe(
        map((data) =>
          data.filter(
            (item) => !query || item.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
          )
        )
      )
      .pipe(
        // group elements by region on a plainWorld object
        map((data) => {
          return data.reduce((world, country) => {
            world[country.region] = [...(world[country.region] || []), country];
            return world;
          }, {});
        }),

        // cast plain world to World object
        map((plainWorld) => {
          const world = new World();
          Object.keys(plainWorld).forEach((key) => {
            world.regions.push(new Region(key, plainWorld[key]));
          });
          // sort world regions by region name
          world.regions.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
          return world;
        })
      );
  }

  private getCountries(): Observable<Country[]> {
    if (!this.countries) {
      this.countries = this.remoteService.getCountries();
    }
    return this.countries;
  }
}
