import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { World } from './models/country';
import { WorldService } from './services/world.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  world$: Observable<World>;
  errorObject = null;

  constructor(private worldService: WorldService) {}

  ngOnInit(): void {
    this.onCountrySearch();
  }

  onCountrySearch(value: string = ''){
    this.world$ = this.worldService.getWorld(value).pipe(
      catchError((err) => {
        this.errorObject = 'Error loading data';
        return throwError(err);
      })
    );
  }
}
