import { CountryRemoteService } from './country-remote.service';
import { TestBed } from '@angular/core/testing';

describe('CountryRemoteService', () => {
  let service: CountryRemoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryRemoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
