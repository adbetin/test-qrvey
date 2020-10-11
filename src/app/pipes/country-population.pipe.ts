import { Pipe, PipeTransform } from '@angular/core';

const SIZES = ['People', 'K', 'M', 'B'];
const mainOrder = 1000;

@Pipe({
  name: 'countryPopulation',
})
export class CountryPopulationPipe implements PipeTransform {
  transform(population: number): string {
    if (population === 0) {
      return '0 People';
    }
    const relation = Math.log(population) / Math.log(mainOrder);
    const order = Math.floor(relation);
    const orderPopulation =
      Math.round((population / Math.pow(mainOrder, order)) * 100) / 100;
    return `${orderPopulation} ${SIZES[order]}`;
  }
}
