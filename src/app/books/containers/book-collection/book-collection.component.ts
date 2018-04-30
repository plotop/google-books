import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { IBook } from '../../models/book.model';
import * as fromBooks from '../../reducers/books-app.reducer';
import * as BookCollectionActions from '../../actions/book-collection.actions';

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.css']
})
export class BookCollectionComponent implements OnInit {
  books$: Observable<IBook[]>;

  constructor(private store: Store<fromBooks.IAppState>) {
    this.books$ = store.pipe(select(fromBooks.getBookCollection));
  }

  ngOnInit() {
    this.store.dispatch(new BookCollectionActions.Load());
  }
}
