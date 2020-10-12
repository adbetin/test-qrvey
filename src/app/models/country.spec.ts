import { Country } from './country';
import { CountryData } from './interfaces/country-data';

describe('Country', () => {
  it('should create an instance', () => {
    expect(new Country({} as CountryData)).toBeTruthy();
  });
});
