import { Observable, OperatorFunction } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';

import { Country } from './../models/country';
import { CountryDataService } from './../repository/country-data.service';
import { CountryRemoteService } from '../repository/country-remote.service';
import { Injectable } from '@angular/core';
import { Region } from './../models/region';
import { World } from './../models/world';

@Injectable({
  providedIn: 'root',
})
export class WorldService {
  constructor(
    private dataService: CountryDataService,
    private remoteService: CountryRemoteService
  ) {}

  private countries: Observable<Country[]>;
  private favCountries: Array<any>;
  private flatCountries: Array<Country>;

  getWorld(query?: string): Observable<World> {
    return this.dataService.getAllFavCountries().pipe(
      map((data) => {
        this.favCountries = data;
        return this.getCountries();
      }),
      mergeAll(),
      this.filterCountries(query),
      this.setFavorites(),
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

  private setFavorites(): OperatorFunction<Country[], Country[]> {
    return map((data) => {
      return data.reduce((list, country) => {
        const favorite = this.favCountries.find(
          (item: any) => item.code === country.code
        );
        country.favoriteId = !!favorite ? favorite.id : 0;
        return [...list, country];
      }, []);
    });
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
      world.regions.sort((a: Region, b: Region) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      );
      return world;
    });
  }

  getCountryBorders(country: Country): string[] {
    return this.flatCountries
      .filter((item) => country.borders.some((border) => border === item.code))
      .map((item) => item.name);
  }

  addFavorite(country: Country) {
    this.dataService.addFavCountry(country).subscribe((response) => {
      country.favoriteId = response;
    });
  }

  removeFavorite(country: Country) {
    this.dataService.removeFavCountry(country.favoriteId).subscribe((response) => {
      country.favoriteId = 0;
    });
  }
}
