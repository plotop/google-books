import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { IBook } from '../../models/book.model';
import * as fromBooks from '../../reducers/books-app.reducer';
import * as BookCollectionActions from '../../actions/book-collection.actions';

@Component({
  selector: 'app-selected-book',
  templateUrl: './selected-book.component.html',
  styleUrls: ['./selected-book.component.css']
})
export class SelectedBookComponent implements OnInit {
  book$: Observable<IBook>;
  isSelectedBookInCollection$: Observable<boolean>;

  constructor(private store: Store<fromBooks.IAppState>) {
    this.book$ = store.pipe(select(fromBooks.getSelectedBook)) as Observable<
      IBook
    >;
    this.isSelectedBookInCollection$ = store.pipe(
      select(fromBooks.isSelectedBookInCollection)
    );
  }

  addToCollection(book: IBook) {
    this.store.dispatch(new BookCollectionActions.AddBook(book));
  }

  removeFromCollection(book: IBook) {
    this.store.dispatch(new BookCollectionActions.RemoveBook(book));
  }
  ngOnInit() {
  }

}
