import { Pipe, PipeTransform } from '@angular/core';

/**
 * format borders in a single line
 */
@Pipe({
  name: 'countryBorders',
})
export class CountryBordersPipe implements PipeTransform {
  transform(countryBorders: string[]): string {
    return countryBorders.length > 0 ? countryBorders.join(', ') : 'none';
  }
}
