import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryBorders'
})
export class CountryBordersPipe implements PipeTransform {
  transform(countryBorders: string[]): string {
    return countryBorders.length > 0 ? countryBorders.join(', ') : 'none';
  }
}
