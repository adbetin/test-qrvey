import { BehaviorSubject, Observable, OperatorFunction } from 'rxjs';
import { Country, Region, World } from './../models/country';

import { CountryRemoteService } from '../repository/country-remote.service';
import { Injectable } from '@angular/core';
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
  private countries: Observable<Country[]>;
  // TODO: remove
  private flatCountries: Array<Country>;

  getWorld(query?: string): Observable<World> {
    return this.getCountries().pipe(
      this.filterCountries(query),
      this.groupCountries(),
      this.createWorld(),
      this.sortWorld()
    );
  }

  private getCountries(): Observable<Country[]> {
    if (!this.countries) {
      this.countries = this.remoteService.getCountries();
      this.countries.subscribe((response) => {
        this.flatCountries = response;
      });
    }
    return this.countries;
  }

  private filterCountries(
    query: string
  ): OperatorFunction<Country[], Country[]> {
    return map((data) =>
      data.filter(
        (item) =>
          !query || item.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
      )
    );
  }

  private groupCountries(): OperatorFunction<Country[], {}> {
    return map((data) => {
      return data.reduce((world, country) => {
        world[country.region] = [...(world[country.region] || []), country];
        return world;
      }, {});
    });
  }

  private createWorld(): OperatorFunction<{}, World> {
    return map((plainWorld) => {
      const world = new World();
      Object.keys(plainWorld).forEach((key) => {
        world.regions.push(new Region(key, plainWorld[key]));
      });
      return world;
    });
  }

  private sortWorld(): OperatorFunction<World, World> {
    return map((world) => {
      world.regions.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      );
      return world;
    });
  }

  getCountryBorders(country: Country): string[] {
    return this.flatCountries
    .filter(item => country.borders.some(border => border === item.code))
    .map(item => item.name);
  }
}
