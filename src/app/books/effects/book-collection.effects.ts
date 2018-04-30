import { Injectable } from '@angular/core';
import { Database } from '@ngrx/db';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/defer';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';

import { IBook } from '../models/book.model';
import {
  AddBook,
  AddBookFail,
  AddBookSuccess,
  CollectionActionTypes,
  LoadFail,
  LoadSuccess,
  RemoveBook,
  RemoveBookFail,
  RemoveBookSuccess,
} from '../actions/book-collection.actions';
import { of } from 'rxjs/observable/of';


@Injectable()
export class BookCollectionEffects {

  @Effect({ dispatch: false })
  openDB$: Observable<any> = Observable.defer(() => {
    return this.db.open('books_app');
  });

  @Effect()
  loadCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.Load),
    switchMap(() =>
      this.db
        .query('books')
        .pipe(
          toArray(),
          map((books: IBook[]) => new LoadSuccess(books)),
          catchError(error => of(new LoadFail(error)))
        )
    )
  );

  @Effect()
  addBookToCollection$: Observable<Action> = this.actions$.pipe(
    ofType<AddBook>(CollectionActionTypes.AddBook),
    map(action => action.payload),
    mergeMap(book =>
      this.db
        .insert('books', [book])
        .pipe(
          map(() => new AddBookSuccess(book)),
          catchError(() => of(new AddBookFail(book)))
        )
    )
  );

  @Effect()
  removeBookFromCollection$: Observable<Action> = this.actions$.pipe(
    ofType<RemoveBook>(CollectionActionTypes.RemoveBook),
    map(action => action.payload),
    mergeMap(book =>
      this.db
        .executeWrite('books', 'delete', [book.id])
        .pipe(
          map(() => new RemoveBookSuccess(book)),
          catchError(() => of(new RemoveBookFail(book)))
        )
    )
  );

  constructor(private actions$: Actions, private db: Database) {}
}
