import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators/take';

import * as fromBooks from '../../reducers/books-app.reducer';
import { IBook } from '../../models/book.model';
import * as BookActions from '../../actions/book.actions';

@Component({
  selector: 'app-find-book',
  templateUrl: './find-book.component.html',
  styleUrls: ['./find-book.component.css']
})
export class FindBookComponent implements OnInit {

  searchQuery$: Observable<string>;
  books$: Observable<IBook[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromBooks.IAppState>) {
    this.searchQuery$ = store.pipe(select(fromBooks.getSearchQuery), take(1));
    this.books$ = store.pipe(select(fromBooks.getSearchResults));
    this.loading$ = store.pipe(select(fromBooks.getSearchLoading));
    this.error$ = store.pipe(select(fromBooks.getSearchError));
  }

  search(query: string) {
    this.store.dispatch(new BookActions.Search(query));
  }

  ngOnInit() {
  }

}
