import { Observable, OperatorFunction, of } from 'rxjs';
import { catchError, map, mergeAll } from 'rxjs/operators';

import { Country } from './../models/country';
import { CountryDataService } from './../repository/country-data.service';
import { CountryRemoteService } from '../repository/country-remote.service';
import { Injectable } from '@angular/core';
import { Region } from './../models/region';
import { StorageData } from './../models/interfaces/storage-data';
import { World } from './../models/world';

/**
 * service to manage the world
 */
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

  /**
   * @description returns the current world, organized by regions
   * @param query query to filter countries
   */
  getWorld(query?: string): Observable<World> {
    return this.getFavorites().pipe(
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

  /**
   * @description  returns an observable containing all favorites
   */
  private getFavorites(): Observable<StorageData[]> {
    return this.dataService.getAllFavCountries().pipe(
      catchError((_err) => of([])) // returns empty array if error
    );
  }

  /**
   * @description  returns an observable to load all countries
   */
  private getCountries(): Observable<Country[]> {
    if (!this.countries) {
      this.countries = this.remoteService.getCountries();
      this.countries.subscribe((response) => {
        this.flatCountries = response;
      });
    }
    return this.countries;
  }

  /**
   * @description operator function to filter countrys by query
   * @param query desired text.
   */
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

  /**
   * @description operator function to relate countries with favorites
   */
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

  /**
   * @description operator function to group countries by region
   */
  private groupCountries(): OperatorFunction<Country[], {}> {
    return map((data) => {
      return data.reduce((world, country) => {
        world[country.region] = [...(world[country.region] || []), country];
        return world;
      }, {});
    });
  }

  /**
   * @description operator function to cast object to world
   */
  private createWorld(): OperatorFunction<{}, World> {
    return map((plainWorld) => {
      const world = new World();
      Object.keys(plainWorld).forEach((key) => {
        world.regions.push(new Region(key, plainWorld[key]));
      });
      return world;
    });
  }

  /**
   * @description operator function to sort regions on a world
   */
  private sortWorld(): OperatorFunction<World, World> {
    return map((world) => {
      world.regions.sort((a: Region, b: Region) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      );
      return world;
    });
  }

  /**
   * @description returns full name borders of a country
   * @param country country
   */
  getCountryBorders(country: Country): string[] {
    return this.flatCountries
      .filter((item) => country.borders.some((border) => border === item.code))
      .map((item) => item.name);
  }

  /**
   * @description add a country as favorite
   * @param country country
   */
  addFavorite(country: Country) {
    this.dataService.addFavCountry(country).subscribe(
      (response) => {
        country.favoriteId = response;
      },
      (_error) => {
        console.log('error adding country');
        country.favoriteId = 0;
      }
    );
  }

  /**
   * @description removes a world from favorites
   * @param country country
   */
  removeFavorite(country: Country) {
    this.dataService.removeFavCountry(country.favoriteId).subscribe(
      (_response) => {
        country.favoriteId = 0;
      },
      (_error) => {
        console.log('error removing country');
        country.favoriteId = 0;
      }
    );
  }
}
