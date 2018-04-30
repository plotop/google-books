import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { Scheduler } from 'rxjs/Scheduler';

import { GoogleBooksService } from '../../core/services/google-books.service';
import {
  BookActionTypes,
  Search,
  SearchComplete,
  SearchError,
} from '../actions/book.actions';
import { IBook } from '../models/book.model';





export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler'
);

@Injectable()
export class BookEffects {
  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType<Search>(BookActionTypes.Search),
    debounceTime(this.debounce || 300, this.scheduler || async),
    map(action => action.payload),
    switchMap(query => {
      if (query === '') {
        return empty();
      }

      const nextSearch$ = this.actions$.pipe(
        ofType(BookActionTypes.Search),
        skip(1)
      );

      return this.googleBooks
        .searchBooks(query)
        .pipe(
          takeUntil(nextSearch$),
          map((books: IBook[]) => new SearchComplete(books)),
          catchError(err => of(new SearchError(err)))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private googleBooks: GoogleBooksService,
    @Optional()
    @Inject(SEARCH_DEBOUNCE)
    private debounce: number,
    @Optional()
    @Inject(SEARCH_SCHEDULER)
    private scheduler: Scheduler
  ) {}
}
