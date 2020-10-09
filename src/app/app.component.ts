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
    this.initWorld();
  }

  initWorld(): void {
    this.world$ = this.worldService.getWorld().pipe(
      catchError((err) => {
        this.errorObject = 'Error al cargar los datos';
        return throwError(err);
      })
    );
  }
}
