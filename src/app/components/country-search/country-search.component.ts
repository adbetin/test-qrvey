import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss'],
})
export class CountrySearchComponent implements OnInit {
  searchField: FormControl;

  @Output() countrySearch = new EventEmitter<string>();

  ngOnInit(): void {
    this.searchField = new FormControl();
    this.searchField.valueChanges.subscribe((value) => {
      this.countrySearch.emit(value);
    });
  }
}
