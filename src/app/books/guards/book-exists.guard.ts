import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import { GoogleBooksService } from '../../core/services/google-books.service';
import * as BookActions from '../actions/book.actions';
import * as fromBooks from '../reducers/books-app.reducer';


@Injectable()
export class BookExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromBooks.IAppState>,
    private googleBooks: GoogleBooksService,
    private router: Router
  ) {}


  waitForCollectionToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(fromBooks.getCollectionLoaded),
      filter(loaded => loaded),
      take(1)
    );
  }


  hasBookInStore(id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromBooks.getBookEntities),
      map(entities => !!entities[id]),
      take(1)
    );
  }


  hasBookInApi(id: string): Observable<boolean> {
    return this.googleBooks.retrieveBook(id).pipe(
      map(bookEntity => new BookActions.Load(bookEntity)),
      tap((action: BookActions.Load) => this.store.dispatch(action)),
      map(book => !!book),
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false);
      })
    );
  }


  hasBook(id: string): Observable<boolean> {
    return this.hasBookInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasBookInApi(id);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCollectionToLoad().pipe(
      switchMap(() => this.hasBook(route.params['id']))
    );
  }
}
